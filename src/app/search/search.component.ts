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
  key: string = '';
  items: Book[] = [];
  searchWord: string = '';
  subscriptions: Subscription[] = [];

  constructor(private booksService: BooksService, private router: Router) {}
  ngOnInit() {
    this.searchWord = this.booksService.getSearchKeyWord();
    this.subscriptions.push(
      this.booksService.books$.subscribe((books) => {
        this.items = books;
      })
    );
    this.booksService.getBooksByName(this.searchWord);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  onSubmit(f: NgForm) {
    this.booksService.getBooksByName(f.value.search);
    this.booksService.setSearchKeyWord(f.value.search);
  }
  getBookDetails(id: string) {
    this.booksService.books$.next(this.items[id]);
    this.router.navigate(['/bookdetails']);
  }
}
