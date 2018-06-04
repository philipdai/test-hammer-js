import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from '../../shared/models/task-type.model';
import { Task } from '../../shared/models/task.model';


@Component({
  selector: 'task-type-list',
  templateUrl: './task-type-list.component.html',
  styleUrls: ['./task-type-list.component.css']
})
export class TaskTypeListComponent implements OnInit {
  ngOnInit() {}

  taskTypeList: Observable<TaskType []>;


}
