import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/auth-services/auth.guard";
import { HotelsResolver } from "src/app/services/hotels.resolver";
import { BookingPaymentComponent } from "./booking-payment.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: BookingPaymentComponent,
    resolve: [HotelsResolver],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [BookingPaymentComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class PaymentModule {}
