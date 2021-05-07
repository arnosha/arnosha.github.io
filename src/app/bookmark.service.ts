import { Injectable } from '@angular/core';

export type Bookmark = {
  id: string;
  url: string;
  tags: string;
};

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarked: Bookmark[];

  constructor() {
    const serialized = localStorage.getItem('images') ?? '[]';

    this.bookmarked = JSON.parse(serialized);
  }

  bookmark(item: Bookmark) {
    if (!this.bookmarked.find((el) => el.id === item.id)) {
      this.bookmarked.push(item);
      localStorage.setItem('images', JSON.stringify(this.bookmarked));
    }
  }

  getBookmarks() {
    return this.bookmarked;
  }

  removeBookmark(item: Bookmark) {
    this.bookmarked = this.bookmarked.filter((el) => el.id !== item.id);
    localStorage.setItem('images', JSON.stringify(this.bookmarked));
    return this.bookmarked;
  }
}
