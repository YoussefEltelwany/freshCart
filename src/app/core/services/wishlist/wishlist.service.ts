import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  Wishnumber:WritableSignal<number> =signal(0)
  constructor(private httpClient: HttpClient) { }

  addToWishlist(productId: string) {
    return this.httpClient.post('/api/v1/wishlists', {
      "productId": productId
  });
  }

  removeFromWishlist(productId: string) {
    return this.httpClient.delete(`/api/v1/wishlists/${productId}`);
  }
}
