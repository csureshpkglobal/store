import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books$ = new BehaviorSubject(null);
  search = '';

  constructor(private httpClient: HttpClient) {}
  getBooksByName(name: string): Observable<Book[]> {
    const URL = 'https://www.googleapis.com/books/v1/volumes?q=' + name;

    return this.httpClient.get(URL).pipe(
      map((res: any) => {
        const books: Book[] = [];
        res.items.map((item: any) => {
          const book: Book = {
            id: item.id,
            title: item.volumeInfo.title,
            imageLink: item.volumeInfo?.imageLinks?.thumbnail,
            description: item.volumeInfo.description,
            authors: item.volumeInfo.authors,
            ratingsCount: item.volumeInfo.ratingsCount,
            publisher: item.volumeInfo.publisher,
            pageCount: item.volumeInfo.pageCount,
            language: item.volumeInfo.language,
          };
          books.push(book);
        });
        return books;
      })
    );
  }
  setSearchKeyWord(search: string): void {
    this.search = search;
  }
  getSearchKeyWord(): string {
    return this.search;
  }
}
