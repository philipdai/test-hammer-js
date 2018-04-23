import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GiftsEffects } from './gifts.effects';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { GiftsComponent } from './gifts.component';
import { GiftNewComponent } from './gift-new/gift-new.component';
import { GiftEditComponent } from './gift-edit/gift-edit.component';
import { GiftDeleteConfirmDialog } from './gift-delete-confirm-dialog/gift-delete-confirm-dialog.component';
import { GiftEditCreateDialog } from './gift-edit-create-dialog/gift-edit-create-dialog.component';
import { GiftFormComponent } from './gift-form/gift-form.component';
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
	declarations: [
		GiftsComponent,
		GiftNewComponent,
		GiftEditComponent,
		GiftDeleteConfirmDialog,
		GiftEditCreateDialog,
		GiftFormComponent,
	],
	entryComponents: [
		GiftNewComponent,
		GiftEditComponent,
		GiftEditCreateDialog,
		GiftDeleteConfirmDialog,
		GiftFormComponent,
	],
})
export class GiftsModule {}
