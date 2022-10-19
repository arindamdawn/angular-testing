import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RolePermission } from './access-control';
import { AccessControlService } from './access-control.service';

@Injectable({
  providedIn: 'root',
})
export class AccessControlGuard implements CanActivate {
  constructor(private accessControlService: AccessControlService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const permittedRoles = route.data['roles'] as RolePermission[];
    return this.accessControlService.hasAllPermissions(permittedRoles);
  }
}
