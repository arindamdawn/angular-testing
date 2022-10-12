import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RolePermissions } from '../access-control/access-control';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  constructor(private authService: AuthService) {}

  hasPermission(permission: RolePermissions) {
    const currentUser = this.authService.loggedInUserSnapshot;
    if (!currentUser) return false;
    return currentUser.roles.indexOf(permission) > -1;
  }

  hasAllPermissions = (permissions: RolePermissions[]) =>
    permissions.every((permission) => {
      const currentUser = this.authService.loggedInUserSnapshot;
      currentUser?.roles.includes(permission);
    });
}
