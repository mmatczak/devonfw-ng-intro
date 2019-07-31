import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <app-book-overview></app-book-overview>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
