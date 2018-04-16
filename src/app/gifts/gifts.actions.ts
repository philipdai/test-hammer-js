import { Action } from '@ngrx/store';

import { Gift } from './gift.model';

export const UPDATE_GIFT = '[Gifts] Update Gift';
export const CREATE_GIFT = '[Gifts] Create Gift';
export const DELETE_GIFT = '[Gifts] Delete Gift';

export const QUERY_GIFTS = '[Gifts] Query Gifts';
export const ADD_ALL_GIFTS = '[Gifts] Add All Gifts';
export const SET_CURRENT_GIFT = '[Gifts] Set Current Gift';
export const LOAD = '[Gifts] LOAD';
export const LOAD_SUCCESS = '[Gifts] LOAD SUCCESS';

export const SUCCESS = '[Gifts] Successful firestore write';

export class SetCurrentGift implements Action {
	readonly type = SET_CURRENT_GIFT;
	constructor(public payload: Gift) {}
}

export class QueryGifts implements Action {
	readonly type = QUERY_GIFTS;
	constructor(public weddingId: string, public giftType: string) {}
}

export class AddAllGifts implements Action {
	readonly type = ADD_ALL_GIFTS;
	constructor(public gifts: Gift[]) {}
}

export class Load implements Action {
	readonly type = LOAD;
	constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
	readonly type = LOAD_SUCCESS;
	constructor(public payload: Gift) {}
}

export class Success implements Action {
	readonly type = SUCCESS;
	constructor(public payload: Gift) {}
}

export class UpdateGift implements Action {
	readonly type = UPDATE_GIFT;
	constructor(public id: string, public changes: Partial<Gift>) {}
}

export class CreateGift implements Action {
	readonly type = CREATE_GIFT;
	constructor(public gift: Gift) {}
}

export class DeleteGift implements Action {
	readonly type = DELETE_GIFT;
	constructor(public id: string) {}
}

export type GiftsActions =
	| QueryGifts
	| AddAllGifts
	| Success
	| UpdateGift
	| CreateGift
	| DeleteGift
	| SetCurrentGift
	| Load
	| LoadSuccess;
