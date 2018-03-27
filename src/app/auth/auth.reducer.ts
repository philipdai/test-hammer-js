import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER_ID_LOGGED_IN,
  SET_USER_LOGGED_IN,
  GET_USER_LOGGED_IN
} from './auth.actions';

import { User } from './user.model';

export interface State {
  isAuthenticated: boolean;
  userIdLoggedIn: string;
  userLoggedIn: User
}

const initialState: State = {
  isAuthenticated: false,
  userIdLoggedIn: null,
  userLoggedIn: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: true
      };
    }

    case SET_UNAUTHENTICATED: {
      return {
        ...state,
        isAuthenticated: false
      };
    }

    case SET_USER_ID_LOGGED_IN: {
      return {
        ...state,
        userIdLoggedIn: action.payload
      };
    }

    case SET_USER_LOGGED_IN: {
      return {
        ...state,
        userLoggedIn: action.payload
      };
    }

    case GET_USER_LOGGED_IN: {
      return {
        ...state,
        userLoggedIn: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export const getAuthState = createFeatureSelector<State>('auth');

export const getIsAuth = (state: State) => state.isAuthenticated;

export const getUserIdLoggedIn = createSelector(getAuthState, (state: State) => state.userIdLoggedIn);
export const getUserLoggedIn = createSelector(getAuthState, (state: State) => state.userLoggedIn);
