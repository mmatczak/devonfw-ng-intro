import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, ResolveEnd, ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  spinnerOn = false;

  constructor(router: Router) {
    router.events.subscribe(routerEvent => {
      const isNavigationEnd = routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError;

      if (routerEvent instanceof ResolveStart) {
        this.spinnerOn = true;
      } else if (routerEvent instanceof ResolveEnd || isNavigationEnd) {
        this.spinnerOn = false;
      }
    });
  }
}
