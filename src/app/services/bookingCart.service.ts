import { Injectable } from "@angular/core";
import { Booking } from "../models/booking.model";
import { BehaviorSubject } from "rxjs";
import { HotelService } from "./hotel.service";

@Injectable({
  providedIn: "root",
})
export class BookingCartService {
  bookingCart: Booking;
  bookingCartChanged = new BehaviorSubject<Booking>(null);

  constructor(private hservice: HotelService) {}

  addToBookingCart(bcart: Booking) {
    this.bookingCart = bcart;
    this.bookingCartChanged.next(this.bookingCart);
    localStorage.setItem("bookingCart", JSON.stringify(this.bookingCart));
  }

  displayBookingCartGetter(bcart: Booking) {
    let allHotels = this.hservice.getHotels();

    return {
      hotel: allHotels.find((h) => h.id === bcart.hotelId),
      roomsQuantity: bcart.roomsQuantity,
      fromDate: bcart.fromDate,
      toDate: bcart.toDate,
      totalAmount: bcart.totalAmount,
    };
  }
}
