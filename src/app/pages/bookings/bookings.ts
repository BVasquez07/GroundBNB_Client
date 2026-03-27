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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    // 1. Capture data from Route Parameters
    this.route.queryParams.subscribe(params => {
      this.checkInDate = params['checkIn'] || 'TBD';
      this.checkOutDate = params['checkOut'] || 'TBD';
      this.guests = +params['guests'] || 1;
      
      // Calculate nights (logic can be expanded based on date strings)
      this.numberOfNights = 8; 
    });

    // 2. Initialize the Master Form
    this.bookingForm = this.fb.group({
      // Payment details
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      holderName: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      
      // Default values from previous page
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
}
