import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import {
  AuthConfig,
  OAuthStorage,
  OAuthModule,
} from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL } from '../tokens/app.token';
import { environment } from 'src/environments/environment';
import { AuthGuardWithForcedLogin } from './auth-guard-with-forced-login.service';

export function authAppInitializerFactory(
  authService: AuthService
): () => Promise<void> {
  return () => authService.runInitialLoginSequence();
}
// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [],
  imports: [CommonModule, OAuthModule.forRoot(), HttpClientModule],
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.usersBaseUrl,
    },
    AuthGuardWithForcedLogin,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: authAppInitializerFactory,
          deps: [AuthService],
          multi: true,
        },
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error(
        'Auth Module is already loaded. Import it in the AppModule only'
      );
    }
  }
}
