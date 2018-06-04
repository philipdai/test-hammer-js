import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskNewComponent } from './task-new/task-new.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TitleResolver } from '../core/resolvers/title.resolver';

const routes: Routes = [
	{ path: '', component: TasksComponent },
	{ path: 'new', component: TaskNewComponent, data: { title: 'New Task' }, resolve: { title: TitleResolver } },
	{
		path: ':taskId/edit',
		component: TaskEditComponent,
		data: { title: 'Edit Task' },
		resolve: { title: TitleResolver },
	},
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ],
})
export class TasksRoutingModule {}
