import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const SET_CURRENT_TITLE = '[UI] Set Current Title';

export class StartLoading implements Action {
	readonly type = START_LOADING;
}

export class StopLoading implements Action {
	readonly type = STOP_LOADING;
}

export class SetCurrentTitle implements Action {
	readonly type = SET_CURRENT_TITLE;
	constructor(public payload?: string) {}
}

export type UIActions = StartLoading | StopLoading | SetCurrentTitle;
