import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HotelFormComponent } from "./hotel-form/hotel-form.component";
import { HotelListComponent } from "./hotel-list/hotel-list.component";
import { IndividualHotelComponent } from "./individual-hotel/individual-hotel.component";
import { SearchComponent } from "./search/search.component";
import { RouterModule, Routes } from "@angular/router";
import { HotelsResolver } from "src/app/services/hotels.resolver";
import { AuthGuard } from "src/app/services/auth-services/auth.guard";
import { IsWebmasterGuard } from "src/app/services/auth-services/is-webmaster.guard";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", component: HotelListComponent, resolve: [HotelsResolver] },
  {
    path: "create",
    component: HotelFormComponent,
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
  {
    path: ":id",
    component: IndividualHotelComponent,
    resolve: [HotelsResolver],
  },
  {
    path: ":id/edit",
    component: HotelFormComponent,
    resolve: [HotelsResolver],
    canActivate: [AuthGuard, IsWebmasterGuard],
  },
];

@NgModule({
  declarations: [
    HotelListComponent,
    HotelFormComponent,
    IndividualHotelComponent,
    SearchComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class HotelsModule {}
