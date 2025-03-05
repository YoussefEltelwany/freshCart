import { log } from 'console';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
    selector: 'app-navbar',
    imports: [
        RouterLink,
        RouterLinkActive,
        CommonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit {
  constructor() { }
  isNavbarOpen = false;
  readonly isLogin = input<boolean>(true);
  private readonly authService = inject(AuthService);
  private readonly cartService =inject(CartService)
  numberOfCarts:Signal<number> =computed(() => this.cartService.cartnumber());
 

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartnumber.set(res.numOfCartItems)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
