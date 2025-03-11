import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwish } from '../../shared/interfaces/iwish';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  showWishlist: Iwish[] = [];

  ngOnInit(): void {
    this.displayWishlist();
  }

  displayWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.showWishlist = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeWishlist(id: string): void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {

        console.log(res);
        this.showWishlist = res.data;
        this.wishlistService.Wishnumber.set(res.data);
        this.wishlistService.Wishnumber.set(res.data.length);
        this.displayWishlist()
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addtoCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.toastrService.success('Product Added Successfully', 'Success',
            {
              positionClass: 'toast-bottom-right'
            }
          );
          this.cartService.cartnumber.set(res.numOfCartItems);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
