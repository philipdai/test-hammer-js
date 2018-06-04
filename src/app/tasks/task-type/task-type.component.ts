import { Component, OnInit, Input, Output } from '@angular/core';
import { TaskType } from '../shared/models/task-type.model';
import { Task } from '../shared/models/task.model';


@Component({
  selector: 'task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.css']
})
export class TaskTypeComponent implements OnInit {
  ngOnInit() {}

  @Input()
  taskType: TaskType;

  @Input()
  tasks: Task[];
}
