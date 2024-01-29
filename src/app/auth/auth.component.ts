import { Component } from "@angular/core";
import { AuthService, responseData } from "./auth.service";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  signUpMode = false;
  errorMessage: string = null;
  isLoading = false;
  constructor(
    private authS: AuthService,

    private router: Router
  ) {}

  formSubmitted(form: NgForm) {
    this.isLoading = true;
    let authObs = new Observable<responseData>();
    if (this.signUpMode) {
      authObs = this.authS.signUp(form.value.email, form.value.password);
    } else {
      authObs = this.authS.signIn(form.value.email, form.value.password);
    }

    authObs.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(["hotels"]);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );

    form.reset();
  }

  onSwitch() {
    this.signUpMode = !this.signUpMode;
  }
}
