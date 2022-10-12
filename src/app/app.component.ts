import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="isAuthenticated; else launcher">Logged In</div>
    <router-outlet></router-outlet>
    <ng-template #launcher>
      <div
        class="flex justify-content-center align-items-center min-h-screen flex-column"
      >
        <div>
          <!-- <f-spinner fill="#fff"></f-spinner> -->
        </div>
        <div class="launcher ">
          <img src="assets/images/fusion-logo.png" />
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      button {
        cursor: pointer;
      }
    `,
  ],
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.hasValidToken()) {
      this.redirectToDashboard();
    }
  }

  redirectToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  get isAuthenticated() {
    return this.authService.hasValidToken();
  }
}
