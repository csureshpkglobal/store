import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  key = '';
  items: Book[] = [];
  searchWord = '';
  subscriptions: Subscription[] = [];
  search = '';

  constructor(private booksService: BooksService, private router: Router) {}
  ngOnInit(): void {
    this.searchWord = this.booksService.getSearchKeyWord();
    // this.subscriptions.push(
    //   this.booksService.books$.subscribe((books) => {
    //     this.items = books;
    //   })
    // );
    if (this.searchWord !== '') {
      this.subscriptions.push(
        this.booksService
          .getBooksByName(this.searchWord)
          .subscribe((result) => {
            this.items = result;
          })
      );
    }
  }
  onSubmit(search: string): void {
    this.booksService.getBooksByName(search).subscribe((result) => {
      this.items = result;
    });
    this.booksService.setSearchKeyWord(search);
  }
  getBookDetails(id: string): void {
    this.booksService.books$.next(this.items[id]);
    this.router.navigate(['/bookdetails']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
