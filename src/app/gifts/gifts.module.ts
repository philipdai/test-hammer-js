import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftsComponent } from './gifts.component';
import { MaterialModule } from '../material.module';
import { GiftsRoutingModule } from './gifts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    GiftsRoutingModule
  ],
  declarations: [GiftsComponent]
})
export class GiftsModule { }
