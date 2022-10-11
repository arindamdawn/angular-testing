import { Observable } from 'rxjs';

export interface Auth {
  login: () => void;
  logout: () => void;
  fetchFusionAccessToken: () => Observable<string>;
}

export interface LoggedInUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  preferred_username: string;
  sub: string;
  updated_at: number;
  zoneinfo: string;
}

export interface UserJWTData {
  aud: string;
  dept: string;
  email: string;
  exp: number;
  iat: number;
  id: string;
  iss: string;
  name: string;
  nameid: string;
  nbf: number;
  pos: string;
  roles: string[];
}
