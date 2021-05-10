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
  constructor(private booksService:BooksService, private router: Router){}
  ngOnInit(){
   
  }
  onSubmit(f: NgForm) {
    console.log(f.value.search); 
    console.log(f.valid);  
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
