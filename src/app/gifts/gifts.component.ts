import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import * as actions from './gifts.actions';
import * as fromGifts from './gifts.reducer';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { MatDialog } from '@angular/material';

import { User } from '../auth/user.model';
import { Wedding } from '../shared/models/wedding.model';
import * as fromAuth from '../auth/auth.reducer';
import { AuthService } from '../auth/auth.service';
import { Gift } from './gift.model';
import { GiftEditCreateDialog } from './gift-edit-create-dialog/gift-edit-create-dialog.component';

@Component({
	selector: 'app-gifts',
	templateUrl: './gifts.component.html',
	styleUrls: [ './gifts.component.css' ],
})
export class GiftsComponent implements OnInit {
	userLoggedIn$: Observable<User>;
	defaultWedding$: Observable<Wedding>;
	gifts$: Observable<any>;
	defaultWeddingId: string;
	defaultGiftType: string;
	cwi: number = 0;

	constructor(
		private store: Store<fromAuth.State | fromGifts.State>,
		private authService: AuthService,
		public dialog: MatDialog
	) {}

	isShowLeft = true;
	isShowRight = false;
	displayedColumns = [ 'role', 'giftName', 'amount', 'note', 'actions' ];

	dataSource: TableDataSource<Gift>;

	SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

	animal: string = 'Cat';
	name: string = 'Beibei';
	weddingTypes: string[] = [ 'Parents, Relatives, Bride & Groom', 'Bridal Party', 'Ceremony Attendants' ];
	currentWeddingTypeIndex = 0;
	defaultWedding: any;

	ngOnInit() {
		this.userLoggedIn$ = merge(
			this.store.select(fromAuth.getUserLoggedIn),
			this.authService.getLocalUserLoggedIn()
		);
		this.defaultWedding$ = merge(
			this.store.select(fromAuth.getDefaultWedding),
			this.authService.getLocalDefaultWedding()
		);

		this.defaultWedding$.subscribe(defaultWedding => {
			this.gifts$ = this.store.select(fromGifts.selectAll);
			if (defaultWedding) {
				this.defaultWeddingId = defaultWedding.id;
				this.defaultGiftType = 'Parents, Relatives, Bride & Groom';
				this.store.dispatch(
					new actions.QueryGifts(defaultWedding.id, this.weddingTypes[this.currentWeddingTypeIndex])
				);
			}
		});

		this.gifts$.subscribe(gifts => {
			console.log('gifts: ', gifts);
			if (gifts.length === 0) {
				gifts.push({
					role: '',
					giftName: '',
					amount: 0,
					note: '',
					weddingId: this.defaultWeddingId,
					giftType: this.weddingTypes[this.cwi],
				});
			}

			if (gifts.length > 0) {
				this.dataSource = new TableDataSource<Gift>(gifts);
			}
		});
	}

	startEdit(row) {
		this.openDialog({ gift: row.currentData, row: row });
		row.startEdit();
	}

	createNew() {
		this.openDialog({ gift: { role: '', giftName: '', amount: 0, note: '' }, row: null });
	}

	confirmEditCreate(row) {
		row.confirmEditCreate();
		if (row.currentData.id) {
			this.updateGift(row.currentData.id, row.currentData);
		} else {
			this.createGift(row.currentData);
		}
	}

	createGift(gift: Gift) {
		let { role, giftName, who, amount, note } = gift;
		const giftData: Gift = {
			id: new Date().getUTCMilliseconds().toString(),
			role,
			giftName,
			who: who || '',
			amount,
			note,
			weddingId: this.defaultWeddingId,
			giftType: this.defaultGiftType,
		};

		this.store.dispatch(new actions.CreateGift(giftData));
	}

	cancelOrDelete(row) {
		row.cancelOrDelete();
		this.deleteGift(row.currentData.id);
	}

	updateGift(id, gift: Gift) {
		let { role, giftName, who, amount, note } = gift;
		this.store.dispatch(
			new actions.UpdateGift(id, {
				role,
				giftName,
				who,
				amount,
				note,
			})
		);
	}

	deleteGift(id) {
		this.store.dispatch(new actions.DeleteGift(id));
	}

	swipeTable(action: string = this.SWIPE_ACTION.RIGHT) {
		console.log(action);
		if (action === 'swipeleft') {
			this.currentWeddingTypeIndex++;
		}

		if (action === 'swiperight') {
			this.currentWeddingTypeIndex--;
		}

		console.log('this.currentWeddingTypeIndex % 3: ', this.currentWeddingTypeIndex % 3);
		console.log(
			'this.weddingTypes[this.currentWeddingTypeIndex % 3]: ',
			this.weddingTypes[this.currentWeddingTypeIndex % 3]
		);

		this.cwi =
			this.currentWeddingTypeIndex % 3 >= 0
				? this.currentWeddingTypeIndex % 3
				: 3 + this.currentWeddingTypeIndex % 3;
		console.log('this.cwi: ', this.cwi);
		this.store.dispatch(new actions.QueryGifts(this.defaultWeddingId, this.weddingTypes[this.cwi]));
	}

	openDialog(data): void {
		let dialogRef = this.dialog.open(GiftEditCreateDialog, {
			width: '250px',
			data: data,
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.row) {
				this.confirmEditCreate(result.row);
			}
			if (result && !result.row && checkCancel(result)) {
				this.createGift({ ...result.gift });
			}
		});
	}
}

function checkCancel(result) {
	return (
		result.gift.role !== '' && result.gift.giftName !== '' && result.gift.amount !== 0 && result.gift.note !== ''
	);
}
