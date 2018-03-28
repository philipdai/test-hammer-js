import { Action } from '@ngrx/store';
import { User } from './user.model';
import { Wedding } from '../shared/models/wedding.model';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_USER_ID_LOGGED_IN = '[Auth] Set User ID Logged In';
export const SET_USER_LOGGED_IN = '[Auth] Set User Logged In';
export const GET_USER_LOGGED_IN = '[Auth] Get User Logged In';
export const GET_DEFAULT_WEDDING = '[Auth] Get Default Wedding';
export const SET_DEFAULT_WEDDING = '[Auth] Set Default Wedding';
export const GET_WEDDINGS = '[Auth] Get Weddings';


export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetUserIdLoggedIn implements Action {
  readonly type = SET_USER_ID_LOGGED_IN;
  constructor(public payload: string) {}
}

export class SetUserLoggedIn implements Action {
  readonly type = SET_USER_LOGGED_IN;
  constructor(public payload: User) {}
}

export class GetUserLoggedIn implements Action {
  readonly type = GET_USER_LOGGED_IN;
  constructor(public payload: User) {}
}

export class GetDefaultWedding implements Action {
  readonly type = GET_DEFAULT_WEDDING;
  constructor(public payload: string) {}
}

export class SetDefaultWedding implements Action {
  readonly type = SET_DEFAULT_WEDDING;
  constructor(public payload: Wedding) {}
}

export class GetWeddings implements Action {
  readonly type = GET_WEDDINGS;
  constructor(public payload: Wedding[]) {}
}

export type AuthActions = SetAuthenticated |
                          SetUnauthenticated |
                          SetUserIdLoggedIn |
                          SetUserLoggedIn |
                          GetUserLoggedIn |
                          GetDefaultWedding |
                          GetWeddings |
                          SetDefaultWedding;
