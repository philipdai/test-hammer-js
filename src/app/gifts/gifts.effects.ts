import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Gift } from './gift.model';
import * as actions from './gifts.actions';
import * as fromGifts from './gifts.reducer';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class GiftsEffects {
	constructor(private actions$: Actions, private afs: AngularFirestore) {}

	@Effect()
	queryGifts$: Observable<Action> = this.actions$
		.ofType(actions.QUERY_GIFTS)
		.map((action: actions.QueryGifts) => action)
		.switchMap(fData => {
			const ref = this.afs.collection<Gift>('gifts', ref => {
				return ref.where('weddingId', '==', fData.weddingId).where('giftType', '==', fData.giftType);
			});

			return ref.snapshotChanges().map(arr => {
				return arr.map(doc => {
					const data = doc.payload.doc.data();
					return {
						id: doc.payload.doc.id,
						...data,
					} as Gift;
				});
			});
		})
		.map(arr => {
			return new actions.AddAllGifts(arr);
		});

	@Effect()
	createGift$: Observable<Action> = this.actions$
		.ofType(actions.CREATE_GIFT)
		.map((action: actions.CreateGift) => {
			return action.gift;
		})
		.switchMap(gift => {
			const ref = this.afs.collection(`gifts`);
			return Observable.fromPromise(ref.add(gift)).map(() => {
				return new actions.Success(gift);
			});
		});

	@Effect()
	upateGift$: Observable<Action> = this.actions$
		.ofType(actions.UPDATE_GIFT)
		.map((action: actions.UpdateGift) => action)
		.switchMap((data: any) => {
			const ref = this.afs.doc<Gift>(`gifts/${data.id}`);
			return Observable.fromPromise(ref.update(data.changes)).map(() => {
				return new actions.Success(data);
			});
		});

	@Effect()
	deleteGift$: Observable<Action> = this.actions$
		.ofType(actions.DELETE_GIFT)
		.map((action: actions.DeleteGift) => action)
		.switchMap((deletedGift: any) => {
			const ref = this.afs.doc<Gift>(`gifts/${deletedGift.id}`);
			return Observable.fromPromise(ref.delete()).map(() => {
				return new actions.Success(deletedGift);
			});
		});
}
