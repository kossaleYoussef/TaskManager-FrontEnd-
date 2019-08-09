import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private TasksService: TaskService, private router: Router) { }

  ngOnInit() {
  }
  createList(title: string) {
    this.TasksService.createList(title).subscribe((response: any) => {
      console.log(response);
      // redirection to /lists/:listID
      this.router.navigate(['lists', response._id]);
    });
  }

}
