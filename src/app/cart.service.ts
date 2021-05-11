import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = [];
  cart$ = new BehaviorSubject(null);
  constructor() { }
  getCartItems(){
    return this.cartItems;
  }
  addCartItem(book:any){
    console.log("Cart Service: "+ book.id);
    this.cartItems.push(book);
    this.cart$.next(this.cartItems.length);
    console.log(this.cartItems);
  }
  deleteItem(id: string) {
    console.log(id);
    let index = this.cartItems.findIndex(item => item.id == id);
    this.cartItems.splice(index, 1);
    this.cart$.next(this.cartItems.length);
    console.log(this.cartItems);

  }
}
