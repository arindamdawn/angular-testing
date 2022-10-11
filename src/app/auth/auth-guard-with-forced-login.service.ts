import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { filter, Observable, switchMap, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardWithForcedLogin implements CanActivate {


  constructor(
    private authService: AuthService,
  ) {
    console.log('hit')
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.isDoneLoading$.pipe(
      filter(isDone => isDone),
      switchMap(_ => this.authService.isAuthenticated$),
      tap(isAuthenticated => isAuthenticated || this.authService.login(state.url)),
    );
  }
}