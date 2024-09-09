import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  // newTask: Task = {
  //   taskId: '',
  //   taskName: '',
  //   description: '',
  //   dueDate: '',
  //   status: 0,
  //   priority: 0,
  //   projectId: '',
  //   userId: '',
  //   createdBy: '',
  //   isDeleted: false,
  //   subTaskDtos: []
  // };
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    console.log('Initializing component...');
    this.loadTasks();
  }

  loadTasks(): void {
    console.log('Loading tasks...');
    this.taskService.getTasks().subscribe(
      {
        next: (tasks: Task[]) => {
          this.tasks = tasks;
        },
        error: (error) => {
          console.error('Error fetching tasks', error);
        },
        complete: () => {
          console.log('Task data fetching completed');
        }
      }
    );
  }
  

  // addTask(): void {
  //   if (this.newTask.taskName && this.newTask.dueDate) {
  //     this.taskService.addTask(this.newTask).subscribe(task => {
  //       this.tasks.push(task);
  //       this.newTask = {
  //         taskId: '',
  //         taskName: '',
  //         description: '',
  //         dueDate: '',
  //         status: 0,
  //         priority: 0,
  //         projectId: '',
  //         userId: '',
  //         createdBy: '',
  //         isDeleted: false,
  //         subTaskDtos: []
  //       }; // إعادة تعيين النموذج
  //     });
  //   }
  // }

  deleteTask(id?: string): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.taskId !== id);
    });
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(() => {
      // تحديث العناصر إذا لزم الأمر
    });
  }
  trackById(index: number, task: Task): string | undefined {
    return task.taskId;
  }
}
