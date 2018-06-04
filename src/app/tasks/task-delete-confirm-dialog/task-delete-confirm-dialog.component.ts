import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from '../../shared/models/task-type.model';
import { Task } from '../../shared/models/task.model';


@Component({
  selector: 'task-delete-confirm-dialog',
  templateUrl: './task-delete-confirm-dialog.component.html',
  styleUrls: ['./task-delete-confirm-dialog.component.css']
})
export class TaskDeleteConfirmDialogComponent implements OnInit {
  ngOnInit() {}



}
