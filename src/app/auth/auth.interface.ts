import { RolePermissions } from "../access-control/access-control";

export interface Auth {
  runInitialLoginSequence(): Promise<void>;
  login(): void;
  logout(): void;
  refresh(): void;
  hasValidToken(): boolean;
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
  roles: RolePermissions[];
}
export type LoggedInUser = Pick<
  UserJWTData,
  'dept' | 'email' | 'roles' | 'name' | 'id' | 'exp' | 'pos' | 'nameid'
>;
