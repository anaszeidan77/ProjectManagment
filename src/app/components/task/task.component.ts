import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { SubTask, Task } from '../../model/task';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})


export class TaskComponent implements OnInit {
  @ViewChild('editTaskModal') editTaskModal!: TemplateRef<any>; // إضافة المرجع للمودال

  projects: any[] = [];
  tasks: Task[] = [];
  selectedTask: Task | undefined;
  formGroup: FormGroup;
  selectedPriority: number | null = null;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private projectService: ProjectService
  ) {
    this.formGroup = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: [],
      projectId: [''],
      userId: [''],
      createdBy: ['815e4cab-fbdc-4902-9c22-17fa78646d90'],
      status: [''],
      isDeleted: [false],
      subTaskDtos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAll().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
      complete: () => {
        console.log('Task data fetching completed');
      }
    });
  }

  openSubtasksModal(modal: any, task: Task): void {
    this.selectedTask = task;
    this.modalService.open(modal);
  }

  addField(): void {
    const control = this.fb.group({
      subTaskName: [''],
      description: [''],
      subTaskProgressPercentage: [0],
      isCompleted: [false],
      subTaskId: ""
    });
    this.subTasksArray.push(control);
  }

  get subTasksArray(): FormArray {
    return this.formGroup.get('subTaskDtos') as FormArray;
  }

  removeField(index: number): void {
    this.subTasksArray.removeAt(index);
  }

  trackById(index: number, task: Task): string | undefined {
    return task.taskId;
  }

  selectPriority(value: number) {
    this.selectedPriority = value;
    this.formGroup.patchValue({ priority: value });
  }

  // فتح مودال إضافة مهمة جديدة
  openAddTaskModal(): void {
    this.selectedTask = undefined;
    this.formGroup.reset();
    this.subTasksArray.clear();
    this.modalService.open(this.editTaskModal);
  }
  updateTask(task: Task): void {
    console.log('Task received in updateTask:', task);
    console.log('Task ID:', task.taskId);
    this.selectedTask = task;
    this.formGroup.patchValue({
      taskId: task.taskId,
      taskName: task.taskName,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      projectId: task.projectId,
      userId: task.userId,
      status: task.status,
      isDeleted: task.isDeleted
    });
  
    this.selectedPriority = task.priority;
  
    this.subTasksArray.clear();
    if (task.subTaskDtos && task.subTaskDtos.length > 0) {
      task.subTaskDtos.forEach(subTask => {
        this.subTasksArray.push(this.fb.group({
          subTaskName: [subTask.subTaskName],
          description: [subTask.description],
          subTaskProgressPercentage: [subTask.subTaskProgressPercentage],
          isCompleted: [subTask.isCompleted],
          subTaskId: [subTask.subTaskId]
        }));
      });
    }
  
    this.modalService.open(this.editTaskModal);
  }
  
  

  saveTask(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      console.log('Form Data:', formData); // تحقق من البيانات هنا
  
      const payload: Task = {
        taskId: this.selectedTask?.taskId,
        taskName: formData.taskName,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        projectId: formData.projectId,
        userId: formData.userId,
        createdBy: "815e4cab-fbdc-4902-9c22-17fa78646d90",
        status: formData.status,
        isDeleted: formData.isDeleted || false,
        subTaskDtos: formData.subTaskDtos.map((subTask: SubTask) => ({
          subTaskId: subTask.subTaskId || null, // تأكد من أن هذا صحيح
          subTaskName: subTask.subTaskName,
          description: subTask.description,
          subTaskProgressPercentage: subTask.subTaskProgressPercentage,
          isCompleted: subTask.isCompleted
        }))
      };
  
      console.log('Payload being sent:', payload); // تحقق من الـ payload هنا
  
      if (this.selectedTask) {
        // تحديث المهمة
        this.taskService.updateTask(payload.taskId!, payload).subscribe({
          next: () => {
            this.loadTasks();
            this.modalService.dismissAll();
          },
          error: (error) => {
            console.error('Error updating task', error);
          }
        });
      } else {
        // إضافة مهمة جديدة
        this.taskService.addTask(payload).subscribe({
          next: () => {
            this.loadTasks();
            this.modalService.dismissAll();
            this.formGroup.reset()
          },
          error: (error) => {
            console.error('Error adding task', error);
          }
        });
      }
    } else {
      console.log("Form is invalid. Please fill in all required fields.");
    }
  }
  

  deleteTask(taskId?: string): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error deleting task', error);
      }
    });
  }
}
