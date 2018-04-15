import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Gift } from '../gift.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import * as giftsActions from '../gifts.actions';
import * as fromRoot from '../../app.reducer';

@Component({
	selector: 'btv-gift-new',
	templateUrl: './gift-new.component.html',
	styleUrls: [ './gift-new.component.sass' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftNewComponent implements OnInit, OnDestroy {
	redirectSub: Subscription;

	constructor(private store: Store<fromRoot.State>, private router: Router, private actionsSubject: ActionsSubject) {}

	ngOnInit() {
		this.redirectSub = this.actionsSubject
			.asObservable()
			.filter(action => action.type === giftsActions.CREATE_GIFT)
			.subscribe((action: giftsActions.Success) => this.router.navigate([ '/gifts' ]));
	}

	ngOnDestroy() {
		this.redirectSub.unsubscribe();
	}

	submitted(gift: Gift) {
		this.store.dispatch(new giftsActions.CreateGift(gift));
	}
}
