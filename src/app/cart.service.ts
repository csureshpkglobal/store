import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Book[] = [];
  cart$ = new BehaviorSubject(null);

  constructor() {}
  getCartItems() {
    return this.cartItems;
  }
  addCartItem(book: Book) {
    this.cartItems.push(book);
    this.cart$.next(this.cartItems.length);
  }
  deleteItem(id: string) {
    let index = this.cartItems.findIndex((item) => item.id == id);
    if (index != -1) {
      this.cartItems.splice(index, 1);
      this.cart$.next(this.cartItems.length);
    }
  }
  clearItems() {
    this.cartItems = [];
    this.cart$.next(this.cartItems.length);
  }
}
