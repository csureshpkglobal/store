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
  addCartItem(id:string){
    console.log("Cart Service: "+ id);
    this.cartItems.push(id);
    this.cart$.next(this.cartItems.length);
  }
}
