import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { CompleteComponent } from "./complete/complete.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { HotelListComponent } from "./hotel-list/hotel-list.component";
import { HotelFormComponent } from "./hotel-form/hotel-form.component";
import { IndividualHotelComponent } from "./individual-hotel/individual-hotel.component";
import { BookingPaymentComponent } from "./booking-payment/booking-payment.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    CompleteComponent,
    AboutusComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    HotelListComponent,
    HotelFormComponent,
    IndividualHotelComponent,
    BookingPaymentComponent,
    BookingsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
