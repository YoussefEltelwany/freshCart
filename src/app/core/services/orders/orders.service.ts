import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private myToken:any = localStorage.getItem('token');

  private id: string | null = this.myToken ? (jwtDecode<{ id?: string, userId?: string }>(this.myToken).id || jwtDecode<{ id?: string, userId?: string }>(this.myToken).userId || null) : null;

  constructor(private httpClient:HttpClient) { }

  Checkoutpayment(id:string , data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}/${window.location.origin}`,
      {
      "shippingAddress": data
    }

  );
  }

  getUserorders():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.id}`)
}
}
