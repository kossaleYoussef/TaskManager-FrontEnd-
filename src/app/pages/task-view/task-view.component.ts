import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any[];
  tasks: any[];
  selectedListId: string;
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params.listId){
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });
      }else{
        this.tasks = undefined;
      }
      console.log(params);
      
    });

    this.taskService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    });
  }

  completeTask(task: Task) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  DeleteList(){
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['./']);
      console.log(res);
    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
