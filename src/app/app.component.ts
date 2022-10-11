import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="logout()">Logout</button><router-outlet></router-outlet>
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
    if(this.authService.hasValidToken()){
      this.redirectToDashboard()
    }
  }

  redirectToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    this.authService.logout();
  }
}
