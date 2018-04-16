import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import * as actions from './gifts.actions';
import { Gift } from './gift.model';

export const giftAdapter = createEntityAdapter<Gift>({
	selectId: (gift: Gift) => gift.id,
	sortComparer: false,
});

export interface State extends EntityState<Gift> {
	currentGift?: Gift;
}

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
			weddingId: '9hNcvjk2VSy2qn1RYFpe',
		},
	},
};

export const INIT_STATE: State = giftAdapter.getInitialState({ currentGift: undefined });

const initialState: State = giftAdapter.getInitialState(defaultGift);

export function giftsReducer(state = initialState, action: actions.GiftsActions) {
	switch (action.type) {
		case actions.ADD_ALL_GIFTS: {
			return giftAdapter.addAll(action.gifts, state);
		}

		case actions.SET_CURRENT_GIFT: {
			return { ...state, currentGift: action.payload };
		}

		case actions.LOAD_SUCCESS: {
			return { ...state, ...giftAdapter.addOne(action.payload as Gift, state) };
		}

		default:
			return state;
	}
}

export const getGiftsState = createFeatureSelector<State>('gifts');

export const { selectIds, selectEntities, selectAll, selectTotal } = giftAdapter.getSelectors(getGiftsState);

export const getCurrentGift = createSelector(getGiftsState, (state: State) => state.currentGift);
