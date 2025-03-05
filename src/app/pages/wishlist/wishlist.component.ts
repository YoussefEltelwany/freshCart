import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
    selector: 'app-wishlist',
    imports: [],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  private readonly wishlistService =inject(WishlistService)
}
