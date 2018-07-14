import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {CommonService} from "./common.service";

@Injectable()
export class Guard implements CanActivate {

  constructor(private cookie: CookieService, private router: Router, private common: CommonService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // let url: string = state.url;

    // let permit: Boolean = this.ifPermit();

    if (this.cookie.get('Authorization')) {
      return true;
    }

    this.router.navigate(['/loginAdmin']);

    return false;

  }

  // ifPermit(): boolean {
  //   let permission: any = {};
  //   this.common.getUserPermission((data) => {
  //     permission = data;
  //     for (let item in permission) {
  //       if (item.slice(0, 2) === '00') {
  //         return true;
  //       }
  //     }
  //   });
  //   return false;
  // }

}
