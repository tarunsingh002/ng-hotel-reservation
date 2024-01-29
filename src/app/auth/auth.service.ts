import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserService } from "../auth/user.service";

export interface responseData {
  kind: string;
  email: string;
  localId: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userS: UserService
  ) {}

  tokenExpirationTimer;
  signUpMode: boolean = false;

  User = new BehaviorSubject<User>(null);

  signUp(email: string, password: string) {
    const apiUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNYFPvjzsxwwHd3-gTIokvjnNGx988kHE";

    return this.http
      .post<responseData>(apiUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.signUpMode = true;
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    const apiUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNYFPvjzsxwwHd3-gTIokvjnNGx988kHE";

    return this.http
      .post<responseData>(apiUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.signUpMode = false;
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  handleAuthentication(
    email: string,
    userID: string,
    token: string,
    expiresIn: number
  ) {
    if (this.signUpMode) {
      const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(email, userID, token, expirationTime);
      this.User.next(user);
      if (email === "webmaster@wm.com") user.webmaster = true;
      this.userS.createUser(user).subscribe((res) => {
        user.rtdid = res.name;
        this.User.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
      });
    } else {
      const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
      let user = new User(email, userID, token, expirationTime);
      if (email === "webmaster@wm.com") user.webmaster = true;
      this.User.next(user);
      this.userS.loadUsers().subscribe((users) => {
        let u = users.find((u) => u.id === user.id);
        if (u.bookings) user.bookings = u.bookings;
        else user.bookings = [];
        user.rtdid = u.rtdid;
        this.User.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(user));
      });
    }
  }

  autoLogout(expiresIn: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  logout() {
    this.User.next(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("bookingCart");
    this.router.navigate(["auth"]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const obj = JSON.parse(localStorage.getItem("userData"));

    if (!obj) {
      return;
    }
    const loadedUser = new User(
      obj.email,
      obj.id,
      obj._token,
      new Date(obj._tokenExpirationDate),
      obj.webmaster,
      obj.orders,
      obj.rtdid
    );

    if (loadedUser.token) {
      this.User.next(loadedUser);
      const expirationTime =
        new Date(obj._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationTime);
    }
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured";

    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);
    else {
      switch (errorRes.error.error.message) {
        case "EMAIL_EXISTS":
          errorMessage = "An account associated with this email already exists";
          break;

        case "INVALID_LOGIN_CREDENTIALS":
          errorMessage = "The password or email is invalid";
          break;
      }
    }
    return throwError(errorMessage);
  }
}
