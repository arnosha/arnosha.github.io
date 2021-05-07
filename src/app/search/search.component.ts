import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, of, Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageChangeEvent } from '@progress/kendo-angular-pager';

import { ImageService } from '../image.service';
import { BookmarkService, Bookmark } from '../bookmark.service';
import { Photo } from '../image.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  private textSubject = new Subject<string>();
  private pageSubject = new BehaviorSubject<number>(1);

  private searchSubject = combineLatest([
    this.textSubject.pipe(debounceTime(500), distinctUntilChanged()),
    this.pageSubject,
  ]).pipe(
    switchMap(([text, page]) => this.imageService.searchByText(text, page))
  );

  images = new Observable();

  skip = 0;
  total = 0;
  pageSize = 0;

  searchImages(text: string) {
    this.textSubject.next(text);
  }

  bookmark(image: Photo & { url: string }, tags: string) {
    this.bookmarkService.bookmark({ ...image, tags });
  }

  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;

    const page = this.skip / this.pageSize + 1;

    this.pageSubject.next(page);
  }

  constructor(
    private imageService: ImageService,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.textSubject.subscribe((_) => {
      this.pageSubject.next(1);
    });

    this.searchSubject.subscribe((res) => {
      const { page, perpage, total } = res.photos;

      this.skip = (page - 1) * perpage;
      this.total = Number(total);
      this.pageSize = perpage;

      this.images = of(res.photos.photo);
    });
  }
}
