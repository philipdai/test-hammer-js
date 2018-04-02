import { Action } from '@ngrx/store';

import { Gift } from './gift.model';

export const SET_GIFTS = '[Gifts] Set Gifts';
export const FETCH_GIFTS = '[Gifts] Fetch Gifts';
export const EDIT_GIFT = '[Gifts] Edit Gift';
export const UPDATE_GIFT = '[Gifts] Update Gift';
export const NEW_GIFT = '[Gifts] New Gift';
export const CREATE_GIFT = '[Gifts] Create Gift';
export const DELETE_GIFT = '[Gifts] Delete Gift';

export class SetGifts implements Action {
	readonly type = SET_GIFTS;

	constructor(public payload: Gift[]) {}
}

export class FetchGifts implements Action {
	readonly type = FETCH_GIFTS;

	constructor(public weddingId: string, public giftType: string) {}
}

export class EditGift implements Action {
	readonly type = EDIT_GIFT;

	constructor(public payload: Gift) {}
}

export class UpdateGift implements Action {
	readonly type = UPDATE_GIFT;

	constructor(public id: string, public changes: Partial<Gift>) {}
}

export class NewGift implements Action {
	readonly type = NEW_GIFT;

	constructor(public payload: Gift) {}
}

export class CreateGift implements Action {
	readonly type = CREATE_GIFT;

	constructor(public payload: Gift) {}
}

export class DeleteGift implements Action {
	readonly type = DELETE_GIFT;

	constructor(public id: string) {}
}

export type GiftsActions = SetGifts | FetchGifts | EditGift | UpdateGift | NewGift | CreateGift | DeleteGift;
