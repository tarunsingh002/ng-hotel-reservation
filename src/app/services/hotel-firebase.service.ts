import { Injectable } from "@angular/core";
import { Hotel } from "../models/hotel.model";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { HotelService } from "./hotel.service";

@Injectable({
  providedIn: "root",
})
export class HotelFirebaseService {
  api = "https://ng-hotel-booking-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient, private hservice: HotelService) {}

  addHotel(h: Hotel) {
    return this.http.post<{ name: string }>(`${this.api}/hotels.json`, h);
  }

  getHotels() {
    return this.http.get(`${this.api}/hotels.json`).pipe(
      map((response) => {
        let hotels: Hotel[] = [];
        for (let id in response) {
          if (response.hasOwnProperty(id))
            hotels.push({ ...response[id], id: id });
        }
        this.hservice.addHotels(hotels);
        return hotels;
      })
    );
  }

  deleteHotel(id: string) {
    return this.http.delete(`${this.api}/hotels/${id}.json`);
  }

  updateHotel(id: string, hotel: Hotel) {
    return this.http.patch(`${this.api}/hotels/${id}.json`, hotel);
  }
}
