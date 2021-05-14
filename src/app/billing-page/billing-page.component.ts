import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book.model';
import { CartService } from '../cart.service';
import { Collection } from '../collection.model';
import { MycollectionService } from '../mycollection.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakBarComponent } from '../snak-bar/snak-bar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css'],
})
export class BillingPageComponent implements OnInit, OnDestroy {
  isValid: boolean = true;
  books: Book[] = [];
  collection: Collection;
  isCart: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private mycollectionService: MycollectionService,
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.mycollectionService.mycollection$.subscribe((res) => {
        if (Array.isArray(res)) {
          this.isCart = true;
          res.forEach((book) => {
            this.books.push(book);
          });
        } else {
          this.isCart = false;
          this.books.push(res);
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  onSubmit(f: NgForm) {
    this.books.forEach((book) => {
      this.collection = {
        title: book.title || '',
        description: book.description || '',
        authors: book.authors || '',
        name: f.value.name || '',
        email: f.value.email || '',
        phone: f.value.phone || '',
        address: f.value.address || '',
      };
      this.mycollectionService.addCollection(this.collection);
      if (this.isCart) {
        this.cartService.clearItems();
      }
      this._snackBar.openFromComponent(SnakBarComponent, {
        duration: 5000,
        panelClass: 'blue-snackbar',
      });
    });
  }
}
