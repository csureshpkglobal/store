import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';
import { MycollectionService } from '../mycollection.service';

import { BillingPageComponent } from './billing-page.component';

describe('BillingPageComponent', () => {
  let component: BillingPageComponent;
  let fixture: ComponentFixture<BillingPageComponent>;
  let cartService: CartService;
  let mycollectionService: MycollectionService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingPageComponent, NgForm],
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [BooksService, CartService, MycollectionService],
    }).compileComponents();
  });

  beforeEach(() => {
    cartService = TestBed.inject(CartService);
    mycollectionService = TestBed.inject(MycollectionService);
    fixture = TestBed.createComponent(BillingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be called onSubmit', () => {
    spyOn(mycollectionService, 'addCollection').and.returnValue(undefined);
    component.isCart = false;
    component.onSubmit('name', 's@g.com', 0, 'address');

    expect(mycollectionService.addCollection).toHaveBeenCalled();
  });
  it('should check email field', () => {
    let email = component.billingForm.controls['email'];
    expect(email).toBeTruthy();
  });
});
