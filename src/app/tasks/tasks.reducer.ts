import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import * as actions from './tasks.actions';
import { Task } from '../shared/models/task.model';

export const taskAdapter = createEntityAdapter<Task>({
	selectId: (task: Task) => task.id,
	sortComparer: false,
});

export interface State extends EntityState<Task> {
	currentTask?: Task;
}

const defaultTask = {
	ids: [ '123' ],
	entities: {
		'123': {
			id: '123',
			title: 'default task',
		  isDone: false,
		  note: '',
			taskTypeId: 'x73qJlGE5QrVPucWf59T'
		},
	},
};

export const INIT_STATE: State = taskAdapter.getInitialState({ currentTask: undefined });

const initialState: State = taskAdapter.getInitialState(defaultTask);

export function tasksReducer(state = initialState, action: actions.TasksActions) {
	switch (action.type) {
		case actions.ADD_ALL_TASKS: {
			return taskAdapter.addAll(action.tasks, state);
		}

		case actions.SET_CURRENT_TASK: {
			return { ...state, currentTask: action.payload };
		}

		case actions.LOAD_SUCCESS: {
			return { ...state, ...taskAdapter.addOne(action.payload as Task, state) };
		}

		default:
			return state;
	}
}

export const getTasksState = createFeatureSelector<State>('tasks');

export const { selectIds, selectEntities, selectAll, selectTotal } = taskAdapter.getSelectors(getTasksState);

export const getCurrentTask = createSelector(getTasksState, (state: State) => state.currentTask);
