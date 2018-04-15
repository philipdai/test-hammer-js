import { Action } from '@ngrx/store';

import { Gift } from './gift.model';

export const UPDATE_GIFT = '[Gifts] Update Gift';
export const CREATE_GIFT = '[Gifts] Create Gift';
export const DELETE_GIFT = '[Gifts] Delete Gift';

export const QUERY_GIFTS = '[Gifts] Query Gifts';
export const ADD_ALL_GIFTS = '[Gifts] Add All Gifts';

export const SUCCESS = '[Gifts] Successful firestore write';

export class QueryGifts implements Action {
	readonly type = QUERY_GIFTS;
	constructor(public weddingId: string, public giftType: string) {}
}

export class AddAllGifts implements Action {
	readonly type = ADD_ALL_GIFTS;
	constructor(public gifts: Gift[]) {}
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

export type GiftsActions = QueryGifts | AddAllGifts | Success | UpdateGift | CreateGift | DeleteGift;
