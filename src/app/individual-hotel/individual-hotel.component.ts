import { Component, OnInit } from "@angular/core";
import { Hotel } from "../hotel.model";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HotelService } from "../hotel.service";
import { AuthService } from "../auth/auth.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Booking } from "../booking-payment/booking.model";
import { BookingCartService } from "../booking-payment/bookingCart.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-individual-hotel",
  templateUrl: "./individual-hotel.component.html",
  styleUrls: ["./individual-hotel.component.css"],
})
export class IndividualHotelComponent implements OnInit {
  hotel: Hotel;
  webmaster = false;
  auth = false;
  userSub: Subscription;
  totalAmount: number;
  reactiveForm: FormGroup;
  today: string;
  minToDate: string;

  constructor(
    private aroute: ActivatedRoute,
    private hservice: HotelService,
    private authS: AuthService,
    private bCartService: BookingCartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.aroute.params.subscribe((params) => {
      this.hotel = this.hservice.getHotels()[+params["id"]];
      this.totalAmount = this.hotel.price;
    });

    this.userSub = this.authS.User.subscribe((user) => {
      if (!!user) {
        this.webmaster = user.webmaster;
        this.auth = true;
      } else {
        this.webmaster = false;
        this.auth = false;
      }
    });

    this.today = formatDate(new Date(), "yyyy-MM-dd", "en");
    let tomorrow = formatDate(
      new Date(Date.now() + 86400000),
      "yyyy-MM-dd",
      "en"
    );

    this.minToDate = tomorrow;

    this.reactiveForm = new FormGroup({
      dates: new FormGroup(
        {
          fromDate: new FormControl(this.today),
          toDate: new FormControl(tomorrow),
        },
        { validators: this.dateValidators }
      ),
      quantity: new FormControl(1),
    });

    this.reactiveForm.valueChanges.subscribe((values) => {
      let from = new Date(values.dates.fromDate).getTime();
      let minTo = new Date(values.dates.fromDate).getTime() + 86400000;
      this.minToDate = formatDate(new Date(minTo), "yyyy-MM-dd", "en");
      let to = new Date(values.dates.toDate).getTime();

      if (to < minTo) {
        this.reactiveForm.patchValue({
          dates: { toDate: this.minToDate },
        });
        to = minTo;
      }
      let days = Math.round(Math.abs((to - from) / 86400000));
      this.totalAmount = days * this.hotel.price * values.quantity;
    });
  }

  onSubmit(rf: FormGroup) {
    if (!this.auth || this.webmaster) {
      this.authS.logout();
      this.router.navigate(["/auth"]);
      return;
    }

    let booking = new Booking(
      this.hotel.id,
      rf.value.quantity,
      rf.value.dates.fromDate,
      rf.value.dates.toDate,
      this.totalAmount
    );

    this.bCartService.addToBookingCart(booking);
    this.router.navigate(["/payment"]);
  }

  dateValidators(group: FormGroup) {
    let from = group.controls["fromDate"].value;
    let to = group.controls["toDate"].value;
    if (
      new Date(from).getTime() <
      new Date(formatDate(new Date(), "yyyy-MM-dd", "en")).getTime()
    )
      return {
        dates: "From Date should not be less than today's date",
      };
    else if (new Date(to).getTime() <= new Date(from).getTime())
      return {
        dates: "To Date should be more than from Date",
      };
    return null;
  }
}
