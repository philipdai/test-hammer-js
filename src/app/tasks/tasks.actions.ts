import { Action } from '@ngrx/store';

import { Task } from '../shared/models/task.model';

export const UPDATE_TASK = '[Tasks] Update Task';
export const CREATE_TASK = '[Tasks] Create Task';
export const DELETE_TASK = '[Tasks] Delete Task';

export const QUERY_TASKS = '[Tasks] Query Task';
export const ADD_ALL_TASKS = '[Tasks] Add All Tasks';
export const SET_CURRENT_TASK = '[Tasks] Set Current Task';
export const LOAD = '[Tasks] LOAD';
export const LOAD_SUCCESS = '[Tasks] LOAD SUCCESS';

export const SUCCESS = '[Tasks] Successful firestore write';

export class SetCurrentTask implements Action {
	readonly type = SET_CURRENT_TASK;
	constructor(public payload: Task) {}
}

export class QueryTasks implements Action {
	readonly type = QUERY_TASKS;
	constructor(public weddingId: string, public taskType: string) {}
}

export class AddAllTasks implements Action {
	readonly type = ADD_ALL_TASKS;
	constructor(public tasks: Task[]) {}
}

export class Load implements Action {
	readonly type = LOAD;
	constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
	readonly type = LOAD_SUCCESS;
	constructor(public payload: Task) {}
}

export class Success implements Action {
	readonly type = SUCCESS;
	constructor(public payload: Task) {}
}

export class UpdateTask implements Action {
	readonly type = UPDATE_TASK;
	constructor(public id: string, public changes: Partial<Task>) {}
}

export class CreateTask implements Action {
	readonly type = CREATE_TASK;
	constructor(public gift: Task) {}
}

export class DeleteTask implements Action {
	readonly type = DELETE_TASK;
	constructor(public id: string) {}
}

export type TasksActions =
	| QueryTasks
	| AddAllTasks
	| Success
	| UpdateTask
	| CreateTask
	| DeleteTask
	| SetCurrentTask
	| Load
	| LoadSuccess;
