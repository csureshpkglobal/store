import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  key = '';
  items = [];
  searchWord: string = '';
  constructor(private booksService:BooksService, private router: Router){}
  ngOnInit() {
    this.searchWord = this.booksService.getSearchKeyWord();
    console.log('searchWord: ' + this.searchWord);
      this.booksService.getBooksByName(this.searchWord).subscribe( (res:any) => {
      console.log(res.items);
      this.items = res.items;
    })
  }
  onSubmit(f: NgForm) {
    console.log(f.value.search); 
    console.log(f.valid);
    
    this.booksService.setSearchKeyWord(f.value.search);
    
    this.booksService.getBooksByName(f.value.search).subscribe( (res:any) => {
      console.log(res.items);
      this.items = res.items;
    })
  }
  title = 'store';

  getBookDetails(id:string){
    this.booksService.books$.next(this.items[id]);
    console.log(id);
    this.router.navigate(['/bookdetails']);
  }
  

}
