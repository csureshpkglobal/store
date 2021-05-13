import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  key = '';
  items = [];
  searchWord: string = '';
  constructor(private booksService: BooksService, private router: Router) {}
  ngOnInit() {
    this.searchWord = this.booksService.getSearchKeyWord();
    this.booksService
      .getBooksByName(this.searchWord)
      .subscribe((books: Book[]) => {
        this.items = books;
      });
  }
  onSubmit(f: NgForm) {
    this.booksService.setSearchKeyWord(f.value.search);
    this.booksService
      .getBooksByName(f.value.search)
      .subscribe((books: Book[]) => {
        this.items = books;
      });
  }
  title = 'store';

  getBookDetails(id: string) {
    this.booksService.books$.next(this.items[id]);
    this.router.navigate(['/bookdetails']);
  }
}
