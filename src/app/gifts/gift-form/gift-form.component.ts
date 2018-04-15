import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Gift } from '../gift.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromShared from '../../shared/shared.reducer';

@Component({
	selector: 'btv-gift-form',
	templateUrl: './gift-form.component.html',
	styleUrls: [ './gift-form.component.sass' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftFormComponent implements OnInit, OnChanges {
	@Input()
	gift: Gift = {
		id: undefined,
		giftName: '',
		giftType: '',
		role: '',
		amount: 0,
		note: '',
		weddingId: '',
		who: '',
	};

	@Output() onSubmit = new EventEmitter<Gift>();

	form: FormGroup;
	currentWeddingId$: Observable<string>;
	currentGiftType$: Observable<string>;

	constructor(public formBuilder: FormBuilder, private store: Store<fromShared.State>) {
		this.form = this.formBuilder.group({
			giftName: [ this.gift.giftName, Validators.required ],
			role: [ this.gift.role ],
			who: [ this.gift.who ],
			amount: [ this.gift.amount ],
			note: [ this.gift.note ],
		});
	}

	ngOnInit() {
		this.currentWeddingId$ = this.store.select(fromShared.getCurrentWeddingId);
		this.currentWeddingId$.subscribe(currentWeddingId => {
			console.log('currentWeddingId: ', currentWeddingId);
			this.gift.weddingId = currentWeddingId;
		});

		this.currentGiftType$ = this.store.select(fromShared.getCurrentGiftType);
		this.currentGiftType$.subscribe(currentGiftType => {
			console.log('currentGiftType: ', currentGiftType);
			this.gift.giftType = currentGiftType;
		});
	}

	ngOnChanges() {
		if (this.gift) {
			this.form.patchValue(this.gift);
		}
	}

	submit() {
		if (this.form.valid) {
			this.gift.giftName = this.form.value.giftName;
			this.gift.role = this.form.value.role;
			this.gift.who = this.form.value.who;
			this.gift.amount = this.form.value.amount;
			this.gift.note = this.form.value.note;
			delete this.gift.id;
			console.log('this.gift: ', this.gift);
			this.onSubmit.emit(this.gift);
		}
	}
}
