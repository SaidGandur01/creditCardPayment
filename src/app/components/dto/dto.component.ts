import { Store } from '@ngrx/store';
import { CreditCard } from './../../model/card.model';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import * as DtoActions from '../../ngrx/actions/dto.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dto',
  templateUrl: './dto.component.html',
  styleUrls: ['./dto.component.scss']
})
export class DtoComponent implements OnInit {

  @Input() cardNumber : any;
  @Input() cardHolder : any;
  @Input() expDate : any;
  @Input() ccvCode : any;
  @Input() amount: any;
  
  public dto: CreditCard;
  
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dto = {
      cardNumber: this.cardNumber,
      cardHolder: this.cardHolder,
      expDate: this.expDate,
      ccvCode: this.ccvCode,
      amount: +this.amount
    };
    this.generatePayment();
  }

  generatePayment() {

    this.paymentService.sentPayment(this.dto).subscribe(res => {
      /*
        A successful request gives me a res variable at this point in the callback.

        As I do not have a server where to validate the http post request, I will leave in the error field, the functions that should go here as follows : 

        this.store.dispatch(new DtoActions.AddPayment(this.dto));
        this.toastr.success('Successful Payment');
        this.router.navigateByUrl('/');
        this.paymentService.globalFlag.next(false);

      */

    }, error => {
      this.store.dispatch(new DtoActions.AddPayment(this.dto));
      this.toastr.success('Successful Payment');
      this.router.navigateByUrl('/');
      this.paymentService.globalFlag.next(false);
    });
  }
}
