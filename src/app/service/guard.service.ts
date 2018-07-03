import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class Guard implements CanActivate {

  constructor(private cookie: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    let url: string = state.url;

    if (this.cookie.get('Authorization')) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;

  }

}
