import * as sharedActions from './shared.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
	currentWeddingId: string;
	currentGiftType: string;
}

export const INIT_SHARED_STATE: State = {
	currentWeddingId: undefined,
	currentGiftType: undefined,
};

export function sharedReducer(state: State = INIT_SHARED_STATE, action: sharedActions.All): State {
	switch (action.type) {
		case sharedActions.SET_CURRENT_WEDDING_ID: {
			return Object.assign({}, state, { currentWeddingId: action.payload });
		}

		case sharedActions.SET_CURRENT_GIFT_TYPE: {
			return Object.assign({}, state, { currentGiftType: action.payload });
		}

		default: {
			return state;
		}
	}
}

export const getSharedState = createFeatureSelector<State>('shared');

// export const getCurrentWeddingId = (state: State) => state.currentWeddingId;
export const getCurrentWeddingId = createSelector(getSharedState, (state: State) => state.currentWeddingId);
export const getCurrentGiftType = createSelector(getSharedState, (state: State) => state.currentGiftType);
