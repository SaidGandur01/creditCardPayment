import { CreditCard } from './../model/card.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public url: string;
  public globalFlag: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {

    /* 
    This url should be the endpoint of the server. 

    Rigth now I don't have a valid url that's why I decided to introduce a dummy url.
    */
    this.url = 'https://dummyurl.com.co';
  }

  public sentPayment(data: CreditCard): Observable<any> {

    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded'
    });
    
    const body = new HttpParams()
    .set('cardNumber', data.cardNumber)
    .set('cardHolder', data.cardHolder)
    .set('expDate', data.expDate.toString())
    .set('ccvCode', data.ccvCode)
    .set('amount', data.amount.toString());
    
    return this.http.post(this.url, body.toString(), { headers: headers });
  }
}
