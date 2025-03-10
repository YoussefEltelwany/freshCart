import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  checkoutForm!: FormGroup;
  cartID: string = '';
  ngOnInit(): void {
    this.initForm();
    this.gitcartID();
  }
  initForm(): void {
    this.checkoutForm = this.formBuilder.group({
      details: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', [Validators.required]],
    });
  }

  gitcartID(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartID = params.get('id')!;
        console.log(this.cartID);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  submitForm(): void {
    console.log(this.checkoutForm.value);
    this.ordersService
      .Checkoutpayment(this.cartID, this.checkoutForm.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.status == 'success') {
            open(data.session.url, '_self');
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
