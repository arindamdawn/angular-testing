import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  template: ` <button (click)="logout()">Logout</button> `,
  styles: [
    `
      button {
        cursor: pointer;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
