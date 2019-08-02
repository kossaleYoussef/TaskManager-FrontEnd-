import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private TasksService: TaskService) { }

  ngOnInit() {
  }
  createNewList() {
    this.TasksService.createList('testing').subscribe((response: any) => {
      console.log(response);
    });
  }
}
