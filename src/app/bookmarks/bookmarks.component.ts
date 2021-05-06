import { Component, OnInit } from '@angular/core';

import { BookmarkService, Bookmark } from '../bookmark.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  getBookmarks() {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

  removeBookmark(bookmark: Bookmark) {
    this.bookmarks = this.bookmarkService.removeBookmark(bookmark);
  }

  ngOnInit(): void {
    this.getBookmarks();
  }
}
