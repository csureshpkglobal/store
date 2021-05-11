import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private booksService:BooksService,
              private cartService:CartService){ }
  id:string;
  bookDetails:any;
  ngOnInit(): void {
    this.booksService.books$.subscribe(response => {
      this.bookDetails = response;
    })
    
  }
  addToCart(){
    this.cartService.addCartItem(this.bookDetails);
  }

}
