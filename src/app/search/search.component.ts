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
    console.log('searchWord: ' + this.searchWord);
    this.booksService
      .getBooksByName(this.searchWord)
      .subscribe((books: Book[]) => {
        this.items = books;
      });
  }
  onSubmit(f: NgForm) {
    console.log(f.value.search);
    console.log(f.valid);

    this.booksService.setSearchKeyWord(f.value.search);

    this.booksService
      .getBooksByName(f.value.search)
      .subscribe((books: Book[]) => {
        this.items = books;
      });
  }
  title = 'store';

  getBookDetails(id: string) {
    console.log('TEST');
    this.booksService.books$.next(this.items[id]);
    console.log(this.items);
    this.router.navigate(['/bookdetails']);
  }
}
