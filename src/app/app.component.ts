import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  items = [];
  opened = true;
  cartItems = [];
  cartCount = 0;
  constructor(private booksService:BooksService, private cartService:CartService){} 
  ngOnInit(){
      this.cartService.cart$.subscribe(response => {
      console.log("RECIEVED");
      console.log(response);
      this.cartCount = response.length;
    })
  }
  title = 'store';
}
