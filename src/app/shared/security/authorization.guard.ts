import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthorizedRoute, Role } from './security.model';
import { AuthorizationService } from './authorization.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly router: Router,
              private readonly authorization: AuthorizationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    const routeConfig = route.routeConfig as AuthorizedRoute<Role>;
    if (routeConfig && routeConfig.permitAll) {
      return true;
    } else {
      const requiredRole = routeConfig.accessAllowedTo;
      if (requiredRole) {
        return this.authorization.isAccessAllowedTo(requiredRole)
          .pipe(
            map(
              isAuthorized => isAuthorized ? isAuthorized : this.router.parseUrl('/access-denied'))
          );
      }
    }

    return this.router.parseUrl('/access-denied');
  }
}
