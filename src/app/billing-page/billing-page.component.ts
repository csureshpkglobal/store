import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book.model';
import { Collection } from '../collection.model';
import { MycollectionService } from '../mycollection.service';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.css'],
})
export class BillingPageComponent implements OnInit {
  constructor(private mycollectionService: MycollectionService) {}
  isValid: boolean = true;
  book: Book;
  collection: Collection;
  ngOnInit(): void {
    this.mycollectionService.mycollection$.subscribe((res) => {
      console.log('In Billing page - Book Details: ');
      this.book = res;
    });
  }
  onSubmit(f: NgForm) {
    this.collection = {
      title: this.book.title || '',
      description: this.book.description || '',
      authors: this.book.authors || '',
      name: f.value.name || '',
      email: f.value.email || '',
      phone: f.value.phone || '',
      address: f.value.address || '',
    };
    this.mycollectionService.addCollection(this.collection);
  }
}
