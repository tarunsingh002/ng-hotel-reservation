import { Injectable } from "@angular/core";

import { User } from "../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { exhaustMap, map } from "rxjs/operators";
import { Booking } from "../../models/booking.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: User[] = [];

  api: string = "https://ng-hotel-booking-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post<{ name: string }>(`${this.api}/users.json`, user);
  }

  createBooking(bookingCart: Booking, user: User) {
    return this.http
      .post<{ name: string }>(`${this.api}/bookings.json`, bookingCart)
      .pipe(
        exhaustMap((res) => {
          // let b = new Booking(
          //   bookingCart.hotelId,
          //   bookingCart.roomsQuantity,
          //   bookingCart.fromDate,
          //   bookingCart.toDate,
          //   bookingCart.totalAmount,
          //   res.name
          // );
          user.bookings.push(res.name);
          localStorage.setItem("userData", JSON.stringify(user));
          return this.http.patch(`${this.api}/users/${user.rtdid}.json`, user);
        })
      );
  }

  loadUserBookings(user: User) {
    return this.http.get(`${this.api}/users/${user.rtdid}/bookings.json`);
  }

  loadUsers() {
    return this.http.get(`${this.api}/users.json`).pipe(
      map((res) => {
        for (let id in res) {
          if (res.hasOwnProperty(id))
            this.users.push({ ...res[id], rtdid: id });
        }
        return this.users;
      })
    );
  }
}
