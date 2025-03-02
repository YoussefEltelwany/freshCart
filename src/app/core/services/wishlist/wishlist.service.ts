import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

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
