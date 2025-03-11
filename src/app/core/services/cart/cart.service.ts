import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }
  cartnumber:WritableSignal<number> =signal(0)
  myToken:any = localStorage.getItem('token');

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
      "productId":id
    }
  )};


  getCart():Observable<any>{
    if (!this.myToken) {
      return throwError(() => new Error('Token is missing!'));
    }

    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`,{
      headers:{
        token: this.myToken
      }
    })
  }


  deleteProductFromCart(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,{
      headers:{
        token: this.myToken
      }
    })
  }

  updateProductQuantity(id:string,quantity:number):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
    {
      "count":quantity
    },
    {
      headers:{
        token: this.myToken
      }
    }
  )};

}
