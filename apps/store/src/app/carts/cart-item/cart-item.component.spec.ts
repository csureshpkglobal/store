import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Book } from '../../book.model';
import { CartService } from '../../cart.service';
import { MycollectionService } from '../../mycollection.service';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let books: Book[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartItemComponent],
      imports: [RouterModule.forRoot([])],
      providers: [CartService, MycollectionService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    books = [
      {
        id: '1',
        title: 'angular',
        imageLink: 'imagelink',
        description: 'desc',
        authors: 'authors',
        ratingsCount: '3',
        publisher: 'pub',
        pageCount: '10',
        language: 'en',
      },
      {
        id: '2',
        title: 'angular',
        imageLink: 'imagelink',
        description: 'desc',
        authors: 'authors',
        ratingsCount: '3',
        publisher: 'pub',
        pageCount: '10',
        language: 'en',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have 0 cartitems to start', () => {
    expect(component.cartItems.length).toEqual(0);
  });
  it('should delete an item from  cartitems when delteItem is called', () => {
    component.cartItems.push(books[0]);
    component.cartItems.push(books[1]);

    component.deleteItem('1');

    expect(component.cartItems.length).toEqual(1);
  });
  it('should not delete an item from  cartitems when delteItem is called with wrong id', () => {
    component.cartItems.push(books[0]);
    component.cartItems.push(books[1]);

    component.deleteItem('3');

    expect(component.cartItems.length).toEqual(2);
  });
});
