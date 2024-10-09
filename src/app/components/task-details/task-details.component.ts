import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../../Pipes/status.pipe';
import { PriorityPipe } from '../../Pipes/priority.pipe';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule,CommonModule,StatusPipe,PriorityPipe],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit {
  taskId!:string;
  task!:Task;
  constructor(private route: ActivatedRoute,private taskService:TaskService){}
  ngOnInit(): void {  
    this.route.params.subscribe(params=>{
      this.taskId=params['Id']
      console.log('taskid',this.taskId);
    });
    this.getTaskById()
  }

  getTaskById(){
    this.taskService.getTasksById(this.taskId).subscribe({
      next:(respnse:Task)=>{
        this.task=respnse
      }
    })
  }
}