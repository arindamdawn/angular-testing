import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <f-button label="Hello"></f-button>
    <f-datatable></f-datatable>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'angular-testing';
}
