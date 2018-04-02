import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';

import { GiftsComponent } from './gifts.component';
import { GiftsRoutingModule } from './gifts-routing.module';
import { giftsReducer } from './gifts.reducer';

@NgModule({
	imports: [ CommonModule, MaterialModule, GiftsRoutingModule, StoreModule.forFeature('gifts', giftsReducer) ],
	declarations: [ GiftsComponent ],
})
export class GiftsModule {}
