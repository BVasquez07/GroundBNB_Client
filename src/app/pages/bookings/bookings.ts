import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-bookings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class Bookings implements OnInit {
  bookingForm!: FormGroup;
  
  // Data passed from previous page
  checkInDate: string = '';
  checkOutDate: string = '';
  guests: number = 1;
  price: number = 400;
  taxes: number = 40;
  numberOfNights: number = 0;
  guestSurcharge: number = 0;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'] || 'TBD';
      this.checkOutDate = params['checkOut'] || 'TBD';
      this.guests = Number(params['guests']) || 1;
      
      this.numberOfNights = 8; 
    });

    this.bookingForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      holderName: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      
      selectedGuests: [this.guests],
      checkIn: [this.checkInDate],
      checkOut: [this.checkOutDate]
    });
  }

  onBook() {
    if (this.bookingForm.valid) {
      console.log('Submission Data:', this.bookingForm.value);
      alert('Booking Confirmed for ' + this.bookingForm.value.holderName);
      // Here you would call your backend service
    } else {
      alert('Please fill in all payment details correctly.');
    }
  }

  onCheckInDateChange(event: any) {
    this.checkInDate = event.target.value;
    this.numberOfNights = this.calculateNights(this.checkInDate, this.checkOutDate);
    this.bookingForm.patchValue({ checkIn: this.checkInDate });
  }

  onCheckOutDateChange(event: any) {
    this.checkOutDate = event.target.value;
    this.numberOfNights = this.calculateNights(this.checkInDate, this.checkOutDate);
    this.bookingForm.patchValue({ checkOut: this.checkOutDate });
  }

  calculateNights(checkIn: string, checkOut: string): number {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
  onGuestsChange(event: any) {
    this.guests = +event.target.value;
    if (this.guests > 2) {
      this.guestSurcharge = (this.guests - 2) * 20;
    } else {
      this.guestSurcharge = 0;
    }
    this.bookingForm.patchValue({ selectedGuests: this.guests });
  }
}
