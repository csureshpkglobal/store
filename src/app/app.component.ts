import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from './books.service';
import { CartService } from './cart.service';
import { MycollectionService } from './mycollection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened: boolean = true;
  cartCount: number = 0;
  collectionCount: number = 0;
  subscriptions: Subscription[] = [];
  title: string = 'store';

  constructor(
    private booksService: BooksService,
    private cartService: CartService,
    private mycollectionService: MycollectionService
  ) {}
  ngOnInit() {
    this.subscriptions.push(
      this.cartService.cart$.subscribe((response) => {
        this.cartCount = response;
      })
    );
    this.subscriptions.push(
      this.mycollectionService.count$.subscribe((response) => {
        this.collectionCount = response;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
