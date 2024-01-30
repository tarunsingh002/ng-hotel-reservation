import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/auth-services/auth.guard";
import { BookingsResolver } from "src/app/services/bookings.resolver";
import { BookingsComponent } from "./bookings.component";

const routes: Routes = [
  {
    path: "",
    component: BookingsComponent,
    resolve: { res2: BookingsResolver },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [BookingsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BookingsModule {}
