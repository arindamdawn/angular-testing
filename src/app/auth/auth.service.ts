import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Auth, UserJWTData } from './auth.interface';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { EndpointService } from '../api/endpoint.service';
import { BASE_URL } from '../tokens/app.token';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements Auth {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject$
    .asObservable()
    // check if user is a valid CRM user
    .pipe(
      switchMap((value) => {
        if (value) {
          return this.apiService.get<{ accessToken: string }>(
            this.endpointService.createUrl('authorize', this.baseUrl)
          );
        }
        return of({ accessToken: '' });
      })
    )
    .pipe(
      tap(({ accessToken }) => {
        if (accessToken) {
          const decodedToken: UserJWTData = jwtDecode(accessToken);
          console.log(decodedToken, 'decoded');
        }
      })
    )
    .pipe(map(({ accessToken }) => !!accessToken));

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$,
  ]).pipe(map((values) => values.every((b) => b)));

  fetchFusionAccessToken() {
    return EMPTY;
  }
  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private apiService: ApiService,
    private endpointService: EndpointService,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    // Useful for debugging:
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
    });

    // This is tricky, as it might cause race conditions (where access_token is set in another
    // tab before everything is said and done there.
    // TODO: Improve this setup. See: https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/issues/2
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn(
        'Noticed changes to access_token (most likely from another tab), updating isAuthenticated'
      );
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );

      if (!this.oauthService.hasValidAccessToken()) {
        this.oauthService.tryLoginCodeFlow();
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter((e) => ['session_terminated', 'session_error'].includes(e.type))
      )
      .subscribe((e) => this.oauthService.tryLoginCodeFlow());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  public runInitialLoginSequence(): Promise<void> {
    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    // currently configured:
    return (
      this.oauthService
        .loadDiscoveryDocument()

        // 1. HASH LOGIN:
        // Try to log in via hash fragment after redirect back
        .then(() => this.oauthService.tryLoginCodeFlow())

        .then(() => {
          if (this.oauthService.hasValidAccessToken()) {
            return Promise.resolve();
          }

          // 2. SILENT LOGIN:
          // Try to log in via a refresh because then we can prevent
          // needing to redirect the user:
          return this.oauthService
            .silentRefresh()
            .then(() => Promise.resolve())
            .catch((result) => {
              console.log('SILENT REFRESH ERROR', result);
              this.oauthService.initCodeFlow();
              Promise.resolve();

              // We can't handle the truth, just pass on the problem to the
              // next handler.
              return Promise.reject(result);
            });
        })

        .then(() => {
          this.isDoneLoadingSubject$.next(true);
        })
        .catch(() => this.isDoneLoadingSubject$.next(true))
    );
  }

  public login(targetUrl?: string) {
    // Note: before version 9.1.0 of the library you needed to
    // call encodeURIComponent on the argument to the method.
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.oauthService.logOut();
  }
  public refresh() {
    this.oauthService.silentRefresh();
  }
  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }
}
