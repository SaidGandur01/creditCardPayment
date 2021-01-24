import { CreditCard } from './model/card.model';
import { PaymentService } from 'src/app/services/payment.service';
import { Component, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  public flag: boolean = false;  
  public dtos : Observable<CreditCard[]>;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>) {
    this.dtos = store.select('dtoPayment');
  }
  
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.paymentService.globalFlag.subscribe(res => {
      this.ngAfterViewChecked();
      this.flag = res;
    });
  }
  
  goToPaymentPage() {
    this.flag = true;
    this.router.navigateByUrl('card-payment');
  }
}
