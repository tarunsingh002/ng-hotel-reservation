import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IsWebmasterGuard implements CanActivate {
  constructor(private authS: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authS.User.pipe(
      take(1),
      map((user) => {
        if (!!user && user.webmaster) return true;
        else if (!!user && !user.webmaster) {
          this.authS.logout();
          return this.router.createUrlTree(["/auth"]);
        } else if (!user) this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
