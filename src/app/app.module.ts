import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./components/auth/auth.component";
import { LoadingSpinnerComponent } from "./components/shared/loading-spinner/loading-spinner.component";
import { AuthInterceptor } from "./services/auth-services/auth.interceptor";
import { CompleteComponent } from "./components/complete/complete.component";
import { AboutusComponent } from "./components/miscellaneous/aboutus/aboutus.component";
import { ContactUsComponent } from "./components/miscellaneous/contact-us/contact-us.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AppRoutingModule } from "./app-routing.module";
import { HotelListComponent } from "./components/hotels/hotel-list/hotel-list.component";
import { HotelFormComponent } from "./components/hotels/hotel-form/hotel-form.component";
import { IndividualHotelComponent } from "./components/hotels/individual-hotel/individual-hotel.component";
import { BookingPaymentComponent } from "./components/booking-payment/booking-payment.component";
import { BookingsComponent } from "./components/bookings/bookings.component";
import { SearchComponent } from "./components/hotels/search/search.component";

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
