import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  Wishnumber:WritableSignal<number> =signal(0);
  constructor(private httpClient: HttpClient) { }


  getWishlist():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  addToWishlist(productId: string):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
      "productId": productId
  });
  }

  removeFromWishlist(productId: string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`);
  }
}
