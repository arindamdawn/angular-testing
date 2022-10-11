import { AuthConfig } from 'angular-oauth2-oidc';
const CLIENT_ID = '0oaiaw33qfoq2ISsV357';
const ISSUER = 'https://sekuremerchants.okta.com';

const USE_SILENT_REFRESH = true;
export const authConfig: AuthConfig = {
  issuer: ISSUER,
  clientId: CLIENT_ID, // The "Auth Code + PKCE" client
  responseType: 'code',
  redirectUri: `${window.location.origin}/auth/login/callback`,
  oidc: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email', // Ask offline_access to support refresh token refreshes
  useSilentRefresh: USE_SILENT_REFRESH, // Needed for Code Flow to suggest using iframe-based refreshes
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  postLogoutRedirectUri: `${window.location.origin}/auth/logout`,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
  nonceStateSeparator: 'semicolon', // Real semicolon gets mangled by Duende ID Server's URI encoding
  silentRefreshShowIFrame: false,
  preserveRequestedRoute: true,
};
