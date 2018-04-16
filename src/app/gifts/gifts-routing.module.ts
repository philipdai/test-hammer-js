import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftsComponent } from './gifts.component';
import { GiftNewComponent } from './gift-new/gift-new.component';
import { GiftEditComponent } from './gift-edit/gift-edit.component';
import { TitleResolver } from '../core/resolvers/title.resolver';

const routes: Routes = [
	{ path: '', component: GiftsComponent },
	{ path: 'new', component: GiftNewComponent, data: { title: 'New Gift' }, resolve: { title: TitleResolver } },
	{
		path: ':giftId/edit',
		component: GiftEditComponent,
		data: { title: 'Edit Gift' },
		resolve: { title: TitleResolver },
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class GiftsRoutingModule {}
