import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { TaskType } from '../shared/models/task-type.model';
import { Task } from '../shared/models/task.model';

import * as actions from './tasks.actions';
import * as fromTasks from './tasks.reducer';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class TasksEffects {
	constructor(private actions$: Actions, private afs: AngularFirestore) {}

	@Effect()
	queryTasks$: Observable<Action> = this.actions$
		.ofType(actions.QUERY_TASKS)
		.map((action: actions.QueryTasks) => action)
		.switchMap(fData => {
			const ref = this.afs.collection<Task>('tasks', ref => {
				return ref.where('weddingId', '==', fData.weddingId)
					.where('taskType', '==', fData.taskType);
			});


			return ref.snapshotChanges().map(arr => {
				return arr.map(doc => {
					const data = doc.payload.doc.data();
					return {
						id: doc.payload.doc.id,
						...data,
					} as Task;
				});
			});
		})
		.map(arr => {
			return new actions.AddAllTasks(arr);
		});

	@Effect()
	createTask$: Observable<Action> = this.actions$
		.ofType(actions.CREATE_TASK)
		.map((action: actions.CreateTask) => {
			return action.gift;
		})
		.switchMap(task => {
			const ref = this.afs.collection(`tasks`);
			return Observable.fromPromise(ref.add(task)).map(() => {
				return new actions.Success(task);
			});
		});

	@Effect()
	upateTask$: Observable<Action> = this.actions$
		.ofType(actions.UPDATE_TASK)
		.map((action: actions.UpdateTask) => action)
		.switchMap((data: any) => {
			const ref = this.afs.doc<Task>(`gifts/${data.id}`);
			return Observable.fromPromise(ref.update(data.changes)).map(() => {
				return new actions.Success(data);
			});
		});

	@Effect()
	deleteTask$: Observable<Action> = this.actions$
		.ofType(actions.DELETE_TASK)
		.map((action: actions.DeleteTask) => action)
		.switchMap((deletedTask: any) => {
			const ref = this.afs.doc<Task>(`gifts/${deletedTask.id}`);
			return Observable.fromPromise(ref.delete()).map(() => {
				return new actions.Success(deletedTask);
			});
		});
}
