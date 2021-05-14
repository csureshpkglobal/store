import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book.model';
import { CartService } from '../cart.service';
import { MycollectionService } from '../mycollection.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Book[] = [];
  constructor(
    private cartService: CartService,
    private mycollectionService: MycollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }
  deleteItem(id: string) {
    this.cartService.deleteItem(id);
  }
  proceedToCheckout() {
    this.mycollectionService.mycollection$.next(this.cartItems);
    this.router.navigate(['/billingpage']);
  }
}
