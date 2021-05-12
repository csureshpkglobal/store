import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { CartService } from './cart.service';
import { MycollectionService } from './mycollection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  items = [];
  opened: boolean = true;
  cartItems = [];
  cartCount: number = 0;
  collectionCount: number = 0;
  constructor(
    private booksService: BooksService,
    private cartService: CartService,
    private mycollectionService: MycollectionService
  ) {}
  ngOnInit() {
    this.cartService.cart$.subscribe((response) => {
      this.cartCount = response;
    });
    this.mycollectionService.count$.subscribe((response) => {
      console.log(response);
      this.collectionCount = response;
    });
  }
  title = 'store';
}
