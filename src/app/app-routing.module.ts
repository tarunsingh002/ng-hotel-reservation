import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";

import { CompleteComponent } from "./complete/complete.component";

import { AuthGuard } from "./auth/auth.guard";
import { IsWebmasterGuard } from "./auth/is-webmaster.guard";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HotelListComponent } from "./hotel-list/hotel-list.component";
import { HotelFormComponent } from "./hotel-form/hotel-form.component";
import { HotelsResolver } from "./hotels.resolver";
import { IndividualHotelComponent } from "./individual-hotel/individual-hotel.component";
import { BookingPaymentComponent } from "./booking-payment/booking-payment.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { BookingsResolver } from "./bookings/bookings.resolver";

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
    path: "create",
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
