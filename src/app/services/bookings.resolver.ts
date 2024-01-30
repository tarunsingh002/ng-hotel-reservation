import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, concat, of } from "rxjs";
import { AuthService } from "./auth-services/auth.service";
import { UserService } from "./auth-services/user.service";
import { LoadingService } from "./loading.service";
import { HotelFirebaseService } from "./hotel-firebase.service";
import { BookingsService } from "./bookings.service";
import { BookingCartService } from "./bookingCart.service";
import { exhaustMap, tap } from "rxjs/operators";
import { Booking } from "../models/booking.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class BookingsResolver
  implements Resolve<{ user: User; res: string[] }>
{
  constructor(
    private aservice: AuthService,
    private uservice: UserService,
    private l: LoadingService,
    private hservice: HotelFirebaseService,
    private bservice: BookingsService,
    private cartservice: BookingCartService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ user: User; res: string[] } | { user: User; res: string[] }> {
    this.l.isLoading.next(true);

    let displayBookingCarts = [];

    return this.hservice.getHotels().pipe(
      exhaustMap(() => {
        return this.aservice.User.pipe(
          exhaustMap((user) => {
            if (user) {
              return this.uservice.loadUserBookings(user).pipe(
                exhaustMap((res: string[]) => {
                  if (res) {
                    let obs: Observable<Booking>[] = [];
                    console.log(res);

                    for (let i = 0; i < res.length; i++) {
                      obs.push(
                        this.bservice.getBooking(res[i]).pipe(
                          tap((res: Booking) => {
                            console.log(res);
                            displayBookingCarts.push(
                              this.cartservice.displayBookingCartGetter(res)
                            );
                          })
                        )
                      );
                    }
                    concat(...obs).subscribe();
                    setTimeout(() => {
                      this.l.isLoading.next(false);
                    }, 1000);
                    return of({
                      user: user,
                      res: displayBookingCarts,
                    });
                  } else {
                    this.l.isLoading.next(false);
                    return of({ user: user, res: [] });
                  }
                })
              );
            } else {
              this.l.isLoading.next(false);
              return of({ user: null, res: [] });
            }
          })
        );
      })
    );
  }
}
