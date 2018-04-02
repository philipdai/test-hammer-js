import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import {
	GiftsActions,
	SET_GIFTS,
	FETCH_GIFTS,
	EDIT_GIFT,
	UPDATE_GIFT,
	NEW_GIFT,
	CREATE_GIFT,
	DELETE_GIFT,
} from './gifts.actions';
import { Gift } from './gift.model';
import * as fromRoot from '../app.reducer';

export const giftAdapter = createEntityAdapter<Gift>();

export interface GiftsState {
	gifts: Gift[];
	activeGift: Gift;
}

export interface State extends EntityState<Gift> {}

const defaultGift = {
	ids: [ '123' ],
	entities: {
		'123': {
			id: '123',
			role: "Bride's Mother",
			giftName: 'Lapel Pin',
			who: '',
			amount: '20.00',
			note: 'Arrives in two weeks',
			giftType: 'Parents, Relatives, Bride&Groom',
		},
	},
};

const initialState: State = giftAdapter.getInitialState(defaultGift);

export function giftsReducer(state = initialState, action: GiftsActions) {
	switch (action.type) {
		case SET_GIFTS:
			return {
				...state,
				gifts: action.payload,
			};

		case FETCH_GIFTS:
			return {
				...state,
			};

		case CREATE_GIFT:
			return giftAdapter.addOne(action.payload, state);

		case UPDATE_GIFT:
			return giftAdapter.updateOne(
				{
					id: action.id,
					changes: action.changes,
				},
				state
			);

		case DELETE_GIFT:
			return giftAdapter.removeOne(action.id, state);
	}
}

export const getGiftsState = createFeatureSelector<State>('gifts');

export const { selectIds, selectEntities, selectAll, selectTotal } = giftAdapter.getSelectors(getGiftsState);
