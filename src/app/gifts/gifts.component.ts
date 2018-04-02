import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import * as actions from './gifts.actions';
import * as fromGifts from './gifts.reducer';

import { User } from '../auth/user.model';
import { Wedding } from '../shared/models/wedding.model';
import * as fromAuth from '../auth/auth.reducer';
import { AuthService } from '../auth/auth.service';

export interface Element {
	giftPurchased: string;
	position: number;
	amount: number;
	role: string;
}

const ELEMENT_DATA: Element[] = [
	{ position: 1, giftPurchased: 'Hydrogen', amount: 1, role: "Bride's Mother" },
	{ position: 2, giftPurchased: 'Helium', amount: 4, role: "Bride's Father" },
	{ position: 3, giftPurchased: 'Lithium', amount: 6, role: "Groom's Mother" },
	{ position: 4, giftPurchased: 'Beryllium', amount: 9, role: "Groom's Father" },
	{ position: 5, giftPurchased: 'Boron', amount: 10, role: 'Stepparent' },
	{ position: 6, giftPurchased: 'Carbon', amount: 12, role: 'Stepparent' },
	{ position: 7, giftPurchased: 'Nitrogen', amount: 14, role: 'Relative' },
	{ position: 8, giftPurchased: 'Oxygen', amount: 15, role: 'Relative' },
	{ position: 9, giftPurchased: 'Fluorine', amount: 18, role: 'Relative' },
	{ position: 10, giftPurchased: 'Neon', amount: 20, role: 'Bride' },
	{ position: 11, giftPurchased: 'Sodium', amount: 22, role: 'Groom' },
	{ position: 12, giftPurchased: 'Magnesium', amount: 24, role: 'Children' },
	{ position: 13, giftPurchased: 'Aluminum', amount: 26, role: 'Relative' },
	{ position: 14, giftPurchased: 'Silicon', amount: 28, role: 'Relative' },
	{ position: 15, giftPurchased: 'Phosphorus', amount: 30, role: 'Relative' },
	{ position: 16, giftPurchased: 'Sulfur', amount: 32, role: 'Relative' },
	{ position: 17, giftPurchased: 'Chlorine', amount: 35, role: 'Relative' },
	{ position: 18, giftPurchased: 'Argon', amount: 39, role: 'Relative' },
	{ position: 19, giftPurchased: 'Potassium', amount: 39, role: 'Relative' },
	{ position: 20, giftPurchased: 'Calcium', amount: 40, role: 'Relative' },
];

@Component({
	selector: 'app-gifts',
	templateUrl: './gifts.component.html',
	styleUrls: [ './gifts.component.css' ],
})
export class GiftsComponent implements OnInit {
	userLoggedIn$: Observable<User>;
	defaultWedding$: Observable<Wedding>;
	gifts$: Observable<any>;

	constructor(private store: Store<fromAuth.State | fromGifts.State>, private authService: AuthService) {}

	isShowLeft = true;
	isShowRight = false;
	displayedColumns = [ 'role', 'giftPurchased', 'amount', 'position' ];

	dataSource = ELEMENT_DATA;

	SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

	avatars = [
		{
			name: 'kristy',
			image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
			visible: true,
		},
		{
			name: 'matthew',
			image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
			visible: false,
		},
		{
			name: 'chris',
			image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
			visible: false,
		},
		{
			name: 'jenny',
			image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
			visible: false,
		},
	];

	ngOnInit() {
		this.userLoggedIn$ = merge(
			this.store.select(fromAuth.getUserLoggedIn),
			this.authService.getLocalUserLoggedIn()
		);
		this.defaultWedding$ = merge(
			this.store.select(fromAuth.getDefaultWedding),
			this.authService.getLocalDefaultWedding()
		);

		if (this.isShowLeft) {
			this.displayedColumns = [ 'role', 'giftPurchased' ];
		}

		if (this.isShowRight) {
			this.displayedColumns = [ 'role', 'amount', 'position' ];
		}
	}

	swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
		console.log(currentIndex);
		if (currentIndex > this.avatars.length || currentIndex < 0) {
			return;
		}

		let nextIndex = 0;

		// next
		if (action === this.SWIPE_ACTION.RIGHT) {
			const isLast = currentIndex === this.avatars.length - 1;
			nextIndex = isLast ? 0 : currentIndex + 1;
		}

		// previous
		if (action === this.SWIPE_ACTION.LEFT) {
			const isFirst = currentIndex === 0;
			nextIndex = isFirst ? this.avatars.length - 1 : currentIndex - 1;
		}

		// toggle avatar visibility
		this.avatars.forEach((x, i) => (x.visible = i === nextIndex));
	}

	swipeTable(action: string = this.SWIPE_ACTION.RIGHT) {
		console.log(action);
		if (action === this.SWIPE_ACTION.RIGHT) {
			this.isShowRight = false;
			this.isShowLeft = true;
			this.displayedColumns = [ 'role', 'giftPurchased' ];
		}
		if (action === this.SWIPE_ACTION.LEFT) {
			this.isShowRight = true;
			this.isShowLeft = false;
			this.displayedColumns = [ 'role', 'amount', 'position' ];
		}
	}
}
