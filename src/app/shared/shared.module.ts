import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { TitleResolver } from '../core/resolvers/title.resolver';

@NgModule({
	imports: [ CommonModule, FormsModule, MaterialModule, FlexLayoutModule ],
	exports: [ CommonModule, FormsModule, MaterialModule, FlexLayoutModule ],
	providers: [ TitleResolver ],
})
export class SharedModule {}
