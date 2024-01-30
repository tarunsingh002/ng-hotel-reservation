import { Component, OnDestroy, OnInit } from "@angular/core";
import { Hotel } from "../../../models/hotel.model";
import { Subscription } from "rxjs";
import { HotelService } from "../../../services/hotel.service";
import { HotelFirebaseService } from "../../../services/hotel-firebase.service";
import { AuthService } from "../../../services/auth-services/auth.service";
import { Router } from "@angular/router";
import { BookingCartService } from "../../../services/bookingCart.service";
import { Booking } from "../../../models/booking.model";
import { formatDate } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-hotel-list",
  templateUrl: "./hotel-list.component.html",
  styleUrls: ["./hotel-list.component.css"],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels: Hotel[] = [];
  auth: boolean = false;
  authSub: Subscription;
  webmaster: boolean = false;
  reactiveForm: FormGroup;

  constructor(
    private hservice: HotelService,
    private hfirebase: HotelFirebaseService,
    private authS: AuthService,
    private router: Router,
    private cartService: BookingCartService
  ) {}

  ngOnInit(): void {
    this.hotels = this.hservice.getHotels();
    this.authSub = this.authS.User.subscribe((user) => {
      this.auth = !!user;
      if (user) this.webmaster = user.webmaster;
    });

    this.reactiveForm = new FormGroup({ search: new FormControl(null) });
    this.reactiveForm.valueChanges.subscribe((value: { search: string }) => {
      if (value.search.trim() === "") {
        this.hotels = this.hservice.getHotels();
      } else {
        this.hotels = this.hservice
          .getHotels()
          .filter((h) =>
            h.location.toLowerCase().includes(value.search.trim().toLowerCase())
          );
      }
    });
  }

  onDelete(index: number) {
    if (confirm("Are you sure you want to delete this hotel ?"))
      this.hfirebase.deleteHotel(this.hotels[index].id).subscribe(() => {
        this.hservice.deleteHotel(index);
      });
  }

  bookNow(hotel: Hotel) {
    let today = formatDate(new Date(), "yyyy-MM-dd", "en");
    let tomorrow = formatDate(
      new Date(Date.now() + 86400000),
      "yyyy-MM-dd",
      "en"
    );

    let booking = new Booking(hotel.id, 1, today, tomorrow, hotel.price);

    this.cartService.addToBookingCart(booking);
    this.router.navigate(["/payment"]);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
