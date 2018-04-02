import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';

@Injectable()
export class GiftsService {
	private fbSubs: Subscription[] = [];

	constructor(private db: AngularFirestore, private uiService: UIService) {}

	fetchGifts(weddingId: string) {
		this.fbSubs.push(
			this.db
				.collection('gifts', ref => {
					return ref.where(`weddingId`, '==', weddingId);
				})
				.snapshotChanges()
				.map(docArray => {
					return docArray.map(doc => {
						return {
							id: doc.payload.doc.id,
							role: doc.payload.doc.data().role,
							who: doc.payload.doc.data().who,
							giftName: doc.payload.doc.data().giftName,
							amount: doc.payload.doc.data().amount,
							note: doc.payload.doc.data().note,
							giftType: doc.payload.doc.data().giftType,
						};
					});
				})
				.subscribe()
		);
	}
}
