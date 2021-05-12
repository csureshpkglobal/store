import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';
import { MycollectionService } from '../mycollection.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private cartService: CartService,
    private myCollectionService: MycollectionService,
    private router: Router
  ) {}
  id: string;
  bookDetails: any;
  ngOnInit(): void {
    this.booksService.books$.subscribe((response) => {
      this.bookDetails = response;
    });
  }
  addToCart() {
    this.cartService.addCartItem(this.bookDetails);
  }
  buyNow() {
    this.myCollectionService.mycollection$.next(this.bookDetails);
    this.router.navigate(['/billingpage']);
  }
}
