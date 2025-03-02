import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink ,SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
cartDeatils:Icart={} as Icart;
 private readonly cartService=inject(CartService);

  ngOnInit(): void {
    this.getCartdata();
  }
  getCartdata(): void{
    this.cartService.getCart().subscribe({
      next: (response) => {
        console.log(response.data);
        this.cartDeatils = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeSpecificProduct(id:string): void {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.cartService.deleteProductFromCart(id).subscribe({
          next: (response) => {
            console.log(response);

           this.cartDeatils = response.data;
             this.cartService.cartnumber.set(response.numOfCartItems)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    });

  }


  update(id:string,quantity:number): void {
    this.cartService.updateProductQuantity(id,quantity).subscribe({
      next: (response) => {
        console.log(response);
        this.cartDeatils = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
