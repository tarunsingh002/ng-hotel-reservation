import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./services/auth-services/auth.interceptor";
import { SharedModule } from "./components/shared/shared.module";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/hotels",
    pathMatch: "full",
  },
  {
    path: "hotels",
    loadChildren: () =>
      import("./components/hotels/hotels.module").then((m) => m.HotelsModule),
  },
  {
    path: "miscellaneous",
    loadChildren: () =>
      import("./components/miscellaneous/miscellaneous.module").then(
        (m) => m.MiscellaneousModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./components/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./components/payment/payment.module").then(
        (m) => m.PaymentModule
      ),
  },
  {
    path: "bookings",
    loadChildren: () =>
      import("./components/bookings/bookings.module").then(
        (m) => m.BookingsModule
      ),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./components/page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
