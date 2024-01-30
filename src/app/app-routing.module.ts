import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./components/auth/auth.component";

import { CompleteComponent } from "./components/complete/complete.component";

import { AuthGuard } from "./services/auth-services/auth.guard";
import { IsWebmasterGuard } from "./services/auth-services/is-webmaster.guard";
import { ContactUsComponent } from "./components/miscellaneous/contact-us/contact-us.component";
import { AboutusComponent } from "./components/miscellaneous/aboutus/aboutus.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { HotelListComponent } from "./components/hotels/hotel-list/hotel-list.component";
import { HotelFormComponent } from "./components/hotels/hotel-form/hotel-form.component";
import { HotelsResolver } from "./services/hotels.resolver";
import { IndividualHotelComponent } from "./components/hotels/individual-hotel/individual-hotel.component";
import { BookingPaymentComponent } from "./components/booking-payment/booking-payment.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { BookingsResolver } from "./services/bookings.resolver";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/hotels",
    pathMatch: "full",
  },
  {
    path: "hotels",
    component: HotelListComponent,
    resolve: [HotelsResolver],
  },
  {
    path: "hotel/:id",
    component: IndividualHotelComponent,
    resolve: [HotelsResolver],
  },
  {
    path: "hotel/:id/edit",
    component: HotelFormComponent,
    resolve: [HotelsResolver],
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
  {
    path: "hotel/create",
    component: HotelFormComponent,
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
  {
    path: "payment",
    component: BookingPaymentComponent,
    resolve: [HotelsResolver],
    canActivate: [AuthGuard],
  },
  {
    path: "bookings",
    component: BookingsComponent,
    resolve: { res2: BookingsResolver },
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    component: AuthComponent,
  },
  {
    path: "complete",
    component: CompleteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "contactus",
    component: ContactUsComponent,
  },
  {
    path: "aboutus",
    component: AboutusComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
