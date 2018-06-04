import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskType } from '../shared/models/task-type.model';
import { Task } from '../shared/models/task.model';


@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  ngOnInit() {}

  taskTypeList: Observable<TaskType []>;


}
