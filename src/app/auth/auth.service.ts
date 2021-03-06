import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { User } from './user.model';
import { Wedding } from '../shared/models/wedding.model';
import { AuthData } from './auth-data.model';

import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { TaskType } from '../shared/models/task-type.model';

@Injectable()
export class AuthService {
	private fbSubs: Subscription[] = [];

	constructor(
		private router: Router,
		private db: AngularFirestore,
		private afAuth: AngularFireAuth,
		private uiService: UIService,
		private store: Store<fromRoot.State>
	) {}

	initAuthListener() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.store.dispatch(new Auth.SetAuthenticated());
				this.router.navigate([ '/gifts' ]);
			} else {
				this.cancelSubscriptions();
				this.store.dispatch(new Auth.SetUnauthenticated());
				this.router.navigate([ '/login' ]);
			}
		});
	}

	registerUser(user: User) {
		this.store.dispatch(new UI.StartLoading());
		this.afAuth.auth
			.createUserWithEmailAndPassword(user.email, user.password)
			.then(result => {
				this.store.dispatch(new UI.StopLoading());
				this.addDataToDatabase({
					userId: result.uid,
					name: user.name,
					role: user.role,
					email: user.email,
					password: user.password,
				});
			})
			.catch(error => {
				this.cancelSubscriptions();
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showSnackbar(error.message, null, 5000);
			});
	}

	login(authData: AuthData) {
		this.store.dispatch(new UI.StartLoading());
		this.afAuth.auth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.store.dispatch(new UI.StopLoading());
				this.store.dispatch(new Auth.SetUserIdLoggedIn(result.uid));
				this.setUserLoggedIn(result.uid);
				this.setDefaultWedding(result.uid);
			})
			.catch(error => {
				this.cancelSubscriptions();
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showSnackbar(error.message, null, 5000);
			});
	}

	getLocalUserLoggedIn() {
		return Observable.from([ JSON.parse(localStorage.getItem('currentUser')) ]);
	}

	getLocalDefaultWedding() {
		return Observable.from([ JSON.parse(localStorage.getItem('currentWedding')) ]);
	}

	setUserLoggedIn(userId: string) {
		this.fbSubs.push(
			this.db.collection('users').doc(userId).valueChanges().subscribe(user => {
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.store.dispatch(new Auth.SetUserLoggedIn(<User>user));
			})
		);
	}

	setDefaultWedding(userId: string) {
		this.fbSubs.push(
			this.db
				.collection('weddings', ref => {
					return ref.where(`usersSetDefault.${userId}`, '==', true);
				})
				.stateChanges()
				.map(items => {
					console.log('items: ', items);
					return { id: items[0].payload.doc.id, ...items[0].payload.doc.data() };
				})
				.subscribe(wedding => {
					console.log('wedding: ', wedding);
					localStorage.setItem('currentWedding', JSON.stringify(wedding));
					this.store.dispatch(new Auth.SetDefaultWedding(<Wedding>wedding));
				})
		);
	}

	cancelSubscriptions() {
		this.fbSubs.forEach(sub => sub.unsubscribe());
	}

	logout() {
		this.cancelSubscriptions();
		localStorage.removeItem('currentUser');
		localStorage.removeItem('currentWedding');
		this.afAuth.auth.signOut();
	}

	private addDataToDatabase(user: User) {
		this.db.collection('users').doc(user.userId).set(user);
		let weddingId = this.db.createId();
		this.db.collection('weddings').doc(weddingId).set({
			ownerId: user.userId,
			name: `${user.name}'s Wedding'`,
			users: { [user.userId]: user },
			usersSetDefault: { [user.userId]: true },
		});
		let tasksId = this.db.createId();
		this.db.collection('tasks').doc(tasksId).set({
			weddingId: weddingId
		});
		let taskTypes = [
			'12+ Months To Go',
			'8-10 Months To Go',
			'6-8 Months To Go',
			'4-6 Months To Go',
			'2-3 Months To Go',
			'1-2 Months To Go',
			'2 Weeks To Go',
			'1 Week To Go',
			'2-3 Days To Go',
			'1 Day To Go',
			'Day Of!'
		];

		let taskTypesCollection = this.db.collection('taskTypes', ref => ref.where('index', '>=', 0));

		let taskTypes$ = taskTypesCollection.snapshotChanges()
			.map(actions => {
				return actions.map(action => {
					const data = action.payload.doc.data() as TaskType;
					return {
						id: action.payload.doc.id,
						title: data.title
					}
				});
			});

		taskTypes$.subscribe(snapshot => {
			if (snapshot.length === 0) {
				taskTypes.forEach((taskType, index) => {
					this.db.collection('taskTypes').add({
						taskType,
						index
					});
				});
			} else {
				console.log('We have task types already!');
			}
		})



	}
}
