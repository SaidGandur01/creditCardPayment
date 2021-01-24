import { CreditCard } from './../../model/card.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {


  public paymentForm: FormGroup;
  public tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  public date = formatDate(this.tomorrow, 'yyyy-MM-dd', 'en_US');
  public card: CreditCard;
  public flag: boolean = false;

  
  constructor(private fb: FormBuilder) { }

  // Getters.
  get f() { return this.paymentForm.controls; }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      cardHolder: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      expDate: ['', [Validators.required, this.dateValidation(this.date)]],
      ccvCode: ['', [this.lengthValidation(3), Validators.pattern('[a-zA-Z ]*')]],
      amount: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
    });
  }

  // Custom Validation function.
  dateValidation(date: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== '' && control.value < date) {
        return { dateValidation: { value: control.value } };
      }
      return null;
    };
  };

  // Custom Validation function.
  lengthValidation(input: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== '' && control.value.length > input || control.value.length < input) {
        return { lengthValidation: { value: control.value } };
      }
      return null;
    };
  };

  onSubmit() {
    this.flag = true;
  }
}
