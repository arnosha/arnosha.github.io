import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { FLICKR_API_KEY, IMG_BASE_URL } from './constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Photo = {
  id: string;
  server: string;
  secret: string;
  farm: number;
};

type Response = {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: string;
    photo: Photo[];
  };
  stat: 'ok' | 'fail';
};

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  searchByText(text: string, page = 1) {
    const response = this.http.get('https://www.flickr.com/services/rest', {
      params: new HttpParams().appendAll({
        api_key: FLICKR_API_KEY,
        method: 'flickr.photos.search',
        format: 'json',
        nojsoncallback: '1',
        text,
        page: String(page),
        per_page: '20',
      }),
    }) as Observable<Response>;

    return response.pipe(
      map((res) => {
        if (res.stat === 'fail' || res.photos.photo.length === 0) {
          return {
            ...res,
            photos: {
              page: 0,
              pages: 0,
              perpage: 0,
              total: 0,
              photo: undefined,
            },
          };
        }
        const photo = res.photos.photo.map<Photo & { url: string }>(
          (photo) => ({
            url: `${IMG_BASE_URL}${photo.server}/${photo.id}_${photo.secret}.jpg`,
            ...photo,
          })
        );

        return {
          ...res,
          photos: {
            ...res.photos,
            photo,
          },
        };
      })
    );
  }

  constructor(private http: HttpClient) {}
}
