import { Component } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  spinnerOn = false;

  constructor(router: Router) {
    router.events.subscribe(routerEvent => {
      if (routerEvent instanceof ResolveStart) {
        this.spinnerOn = true;
      } else if (routerEvent instanceof ResolveEnd) {
        this.spinnerOn = false;
      }
    });
  }
}
