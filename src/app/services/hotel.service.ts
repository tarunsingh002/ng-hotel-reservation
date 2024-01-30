import { Injectable } from "@angular/core";
import { Hotel } from "../models/hotel.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HotelService {
  hotels: Hotel[] = [];

  hotelsChanged = new BehaviorSubject<Hotel[]>(null);

  constructor() {}

  addHotel(h: Hotel) {
    this.hotels.push(h);
    this.hotelsChanged.next(this.hotels);
  }

  addHotels(hotels: Hotel[]) {
    this.hotels = hotels;
    this.hotelsChanged.next(this.hotels);
  }

  getHotels() {
    return this.hotels;
  }

  deleteHotel(index: number) {
    this.hotels.splice(index, 1);
    this.hotelsChanged.next(this.hotels);
  }
}
