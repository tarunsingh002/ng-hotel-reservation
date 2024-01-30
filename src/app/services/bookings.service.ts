import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BookingsService {
  api: string = "https://ng-hotel-booking-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) {}

  getBooking(id: string) {
    return this.http.get(`${this.api}/bookings/${id}.json`);
  }
}
