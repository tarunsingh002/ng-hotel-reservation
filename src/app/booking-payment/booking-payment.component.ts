import { Component, OnDestroy, OnInit } from "@angular/core";
import { Booking } from "./booking.model";
import { Subscription } from "rxjs";
import { User } from "../auth/user.model";
import { Hotel } from "../hotel.model";
import { UserService } from "../auth/user.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { LoadingService } from "../loading.service";
import { BookingCartService } from "./bookingCart.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-booking-payment",
  templateUrl: "./booking-payment.component.html",
  styleUrls: ["./booking-payment.component.css"],
})
export class BookingPaymentComponent implements OnInit, OnDestroy {
  bookingCart: Booking;
  bookingCartSub: Subscription;
  user: User;
  userSub: Subscription;
  displayCart: {
    hotel: Hotel;
    roomsQuantity: number;
    fromDate: string;
    toDate: string;
    totalAmount: number;
  };

  constructor(
    private userS: UserService,
    private aservice: AuthService,
    private router: Router,
    private l: LoadingService,
    private cartservice: BookingCartService
  ) {}

  ngOnInit(): void {
    this.bookingCartSub = this.cartservice.bookingCartChanged.subscribe(
      (cart) => {
        if (!localStorage.getItem("bookingCart") && !cart) {
          this.bookingCart = null;
          this.displayCart = null;
        } else if (localStorage.getItem("bookingCart") && !cart) {
          this.bookingCart = JSON.parse(localStorage.getItem("bookingCart"));
          this.displayCart = this.cartservice.displayBookingCartGetter(
            this.bookingCart
          );
        } else if (!localStorage.getItem("bookingCart") && cart) {
          this.bookingCart = cart;
          this.displayCart = this.cartservice.displayBookingCartGetter(
            this.bookingCart
          );
        } else if (localStorage.getItem("bookingCart") && cart) {
          this.bookingCart = cart;
          this.displayCart = this.cartservice.displayBookingCartGetter(
            this.bookingCart
          );
        }
      }
    );

    this.userSub = this.aservice.User.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.bookingCartSub.unsubscribe();
  }

  onSubmit(f: NgForm) {
    let value = f.value;
    this.l.isLoading.next(true);
    this.userS.createBooking(this.bookingCart, this.user).subscribe(() => {
      this.l.isLoading.next(false);
      this.cartservice.bookingCartChanged.next(null);
      this.cartservice.bookingCart = null;
      localStorage.removeItem("bookingCart");
      this.router.navigate(["complete"]);
    });
  }
}
