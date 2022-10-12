import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RolePermissions } from './access-control';

type LOGICAL_OPERATOR = 'AND' | 'OR';

@Directive({
  selector: '[hasPermission]',
})
export class AccessControlDirective implements OnInit {
  private permissions: RolePermissions[] = [];
  private logicalOperator: LOGICAL_OPERATOR = 'AND';
  private isHidden = true;
  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set hasPermission(permissions: RolePermissions[]) {
    this.permissions = permissions;
  }

  @Input()
  set hasPermissionOperator(operator: LOGICAL_OPERATOR) {
    this.logicalOperator = operator;
  }

  ngOnInit(): void {
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if (this.isHidden) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainerRef.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;
    const currentUser = this.authService.loggedInUserSnapshot;

    if (currentUser && currentUser.roles) {
      const hasAllPermissions = this.permissions.every((permission) =>
        currentUser.roles.includes(permission)
      );

      const hasAtleastOnePermission =
        this.permissions.filter(
          (permission) => currentUser.roles.indexOf(permission) > -1
        ).length > 0;

      if (this.logicalOperator === 'OR' && !hasAtleastOnePermission) {
        return false;
      }

      if (this.logicalOperator === 'AND' && !hasAllPermissions) {
        return false;
      }
      return true;
    }
    return hasPermission;
  }
}
