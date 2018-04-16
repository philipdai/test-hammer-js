import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Gift } from '../gift.model';
import { Store, ActionsSubject } from '@ngrx/store';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import * as giftsActions from '../gifts.actions';
import * as fromGifts from '../gifts.reducer';

@Component({
	selector: 'btv-gift-edit',
	templateUrl: './gift-edit.component.html',
	styleUrls: [ './gift-edit.component.sass' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftEditComponent implements OnInit, OnDestroy {
	gift$: Observable<Gift>;
	redirectSub: Subscription;

	constructor(
		public store: Store<fromGifts.State>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private actionsSubject: ActionsSubject
	) {}

	ngOnInit() {
		this.gift$ = this.store.select(fromGifts.getCurrentGift);

		// If the update effect fires, we check if the current id is the one being updated, and redirect to its details
		this.redirectSub = this.actionsSubject
			.filter(action => action.type === giftsActions.SUCCESS)
			.filter(
				(action: giftsActions.Success) => action.payload.id === this.activatedRoute.snapshot.params['giftId']
			)
			.subscribe((action: giftsActions.Success) => this.router.navigate([ '/gifts' ]));

		this.activatedRoute.params.subscribe(params => {
			// update our id from the backend in case it was modified by another client
			this.store.dispatch(new giftsActions.Load(params['giftId']));
		});
	}

	ngOnDestroy() {
		this.redirectSub.unsubscribe();
	}

	submitted(gift: Gift) {
		this.store.dispatch(new giftsActions.UpdateGift(gift.id, gift));
	}
}
