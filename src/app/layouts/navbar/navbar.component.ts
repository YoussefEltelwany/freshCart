import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor() {}
  isNavbarOpen = false;
  readonly isLogin = input<boolean>(true);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  numberOfCarts: Signal<number> = computed(() => this.cartService.cartnumber());
  numberOfWishlist: Signal<number> = computed(() =>
    this.wishlistService.Wishnumber()
  );

  ngOnInit(): void {
    this.cartNumber();
    this.Wishnumber();
  }
  cartNumber(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartnumber.set(res.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  Wishnumber(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.Wishnumber.set(res.count);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
