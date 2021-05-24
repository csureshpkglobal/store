import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { BooksService } from './books.service';

let mockBooks = [
  {
    id: '1',
    title: 'Angular',
    imageLink: '/',
    description: 'desc1',
    authors: 'author1',
    ratingsCount: '5',
    publisher: 'pub1',
    pageCount: '10',
    language: 'en',
  },
];
class BooksServiceMock {
  getBooksByName = (search) => {
    return of(mockBooks);
  };
}

describe('BooksService', () => {
  let service: BooksService;
  let search: string;
  let mocbooks$ = new BehaviorSubject(null);
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService],
    });

    search = 'angular';
    service = TestBed.inject(BooksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  xit('should the all the books as result when getBooksByName is called with search keyword', fakeAsync(() => {
    service.getBooksByName(search).subscribe((results) => {
      expect(results).toBe(mockBooks);
    });
    const mockURL = 'https://www.googleapis.com/books/v1/volumes?q=' + search;

    const req = httpTestingController.expectOne(mockURL);

    expect(req.request.url.endsWith(search)).toEqual(true);
    req.flush(mockBooks);
    tick(10000);

    httpTestingController.verify();
  }));
});
