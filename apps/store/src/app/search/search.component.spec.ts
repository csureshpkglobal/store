import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';

import { SearchComponent } from './search.component';
import { BooksService } from '../books.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const mockBooks = [
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
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let bookService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, NgForm, NgModel],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
      providers: [BooksService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    bookService = TestBed.inject(BooksService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(bookService, 'getSearchKeyWord').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit form', () => {
    spyOn(bookService, 'getBooksByName').and.returnValue(of(mockBooks));
    spyOn(bookService, 'setSearchKeyWord');
    component.onSubmit('AngularJS');
    expect(bookService.getBooksByName).toHaveBeenCalled();
    expect(bookService.setSearchKeyWord).toHaveBeenCalled();
  });
});
