import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();

  constructor() {}
  fullName: string = '';
  address: string = '';
  creditCard: number | string = '';
  creditCardErrorMsg: string = '';

  ngOnInit(): void {}
  onSubmit(): void {
    this.checkoutSuccess.emit(this.fullName);
  }

  onCreditCardChange(newValue: string) {
    if (/^\d+$/.test(newValue) || newValue === '') {
      this.creditCardErrorMsg = '';
    } else {
      this.creditCardErrorMsg = 'Please input only numbers!';
    }
    this.creditCard = newValue;
  }

  onAddressChange(newValue: string) {
    this.address = newValue;
  }

  onFullNameChange(newValue: string) {
    this.fullName = newValue;
  }
}
