import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksEffects } from './tasks.effects';
import { tasksReducer } from './tasks.reducer';

import { TasksComponent } from './tasks.component';
import { TaskTypeComponent } from './task-type/task-type.component';
import { TaskTypeListComponent } from './task-type-list/task-type-list.component';
import { TaskNewComponent } from './task-new/task-new.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDeleteConfirmDialogComponent } from './task-delete-confirm-dialog/task-delete-confirm-dialog.component';
import { TaskEditCreateDialogComponent } from './task-edit-create-dialog/task-edit-create-dialog.component';
import { TaskFormComponent } from './task-form/task-form.component';


@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		MaterialModule,
		TasksRoutingModule,
		StoreModule.forFeature('tasks', tasksReducer),
		EffectsModule.forFeature([ TasksEffects ]),
	],
	declarations: [
		TasksComponent,
		TaskNewComponent,
		TaskEditComponent,
		TaskDeleteConfirmDialogComponent,
		TaskEditCreateDialogComponent,
		TaskFormComponent,
	],
	entryComponents: [
    TasksComponent,
		TaskNewComponent,
		TaskEditComponent,
		TaskDeleteConfirmDialogComponent,
		TaskEditCreateDialogComponent,
		TaskFormComponent,
	],
})
export class TasksModule {}
