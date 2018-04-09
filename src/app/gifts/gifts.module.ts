import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GiftsEffects } from './gifts.effects';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { GiftsComponent } from './gifts.component';
import { GiftEditCreateDialog } from './gift-edit-create-dialog/gift-edit-create-dialog.component';
import { GiftsRoutingModule } from './gifts-routing.module';
import { giftsReducer } from './gifts.reducer';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule,
		GiftsRoutingModule,
		StoreModule.forFeature('gifts', giftsReducer),
		EffectsModule.forFeature([ GiftsEffects ]),
	],
	declarations: [ GiftsComponent, GiftEditCreateDialog ],
	entryComponents: [ GiftEditCreateDialog ],
})
export class GiftsModule {}
