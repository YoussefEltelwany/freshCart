import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  private readonly router = inject(Router)
  userData:any;

  sendRrgisterData(data:object):Observable<any>{
    return this.httpClient.post( `${environment.baseUrl}/api/v1/auth/signup`,data);
  }

  sendLoginData(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);
  }


  getUserdata():void{
    this.userData = jwtDecode(localStorage.getItem('token')!);
  }


  logout():void{
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }
}
