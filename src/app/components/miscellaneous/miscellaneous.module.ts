import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/auth-services/auth.guard";
import { CompleteComponent } from "./complete/complete.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
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
];

@NgModule({
  declarations: [CompleteComponent, ContactUsComponent, AboutusComponent],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
})
export class MiscellaneousModule {}
