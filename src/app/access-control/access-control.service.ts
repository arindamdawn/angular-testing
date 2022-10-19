import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RolePermission } from '../access-control/access-control';

@Injectable({
  providedIn: 'root',
})
export class AccessControlService {
  constructor(private authService: AuthService) {}

  hasPermission(permission: RolePermission) {
    const currentUser = this.authService.loggedInUserSnapshot;
    if (!currentUser) return false;
    return currentUser.roles.some((_) => permission);
  }

  hasAllPermissions = (permissions: RolePermission[]) =>
    permissions.every((permission) => {
      const currentUser = this.authService.loggedInUserSnapshot;
      currentUser?.roles.includes(permission);
    });
}
