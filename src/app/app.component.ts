import { Component, inject } from '@angular/core';
import { TaskService } from './tasks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
interface Task {
  id: number;
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [TaskService, HttpClient]
})
export class AppComponent {
  tasks: Task[];
  task: string;
  taskService: TaskService;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
  ) {

    this.tasks = [];
    this.task = '';

    this.taskService = inject(TaskService);
  }
  title = 'task-ui';
  ngOnInit() {
    this.taskService.getTasks().subscribe((any) => {
      console.log(any);
      this.tasks = any as Task[];
    });
  }

  addTask(task: string) {
    this.taskService.addTask(task).subscribe();
    this.task ='';
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe((data) => {
      console.log(data);
    });
  }
}