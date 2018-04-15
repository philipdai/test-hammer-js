import { Action } from '@ngrx/store';

export const SET_CURRENT_WEDDING_ID = '[SHARED] Set Current Wedding ID';
export const SET_CURRENT_GIFT_TYPE = '[SHARED] Set Current Gift Type';

export class SetCurrentWeddingId implements Action {
	readonly type = SET_CURRENT_WEDDING_ID;

	constructor(public payload: string) {}
}

export class SetCurrentGiftType implements Action {
	readonly type = SET_CURRENT_GIFT_TYPE;

	constructor(public payload: string) {}
}

export type All = SetCurrentWeddingId | SetCurrentGiftType;
