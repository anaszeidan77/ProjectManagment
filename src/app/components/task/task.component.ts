import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { SubTask, Task } from '../../model/task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { TruncateTextPipe } from '../../Pipes/truncateText.pipe';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,TruncateTextPipe],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @ViewChild('editTaskModal') editTaskModal!: TemplateRef<any>;

  projects: any[] = [];
  tasks: Task[] = [];
  selectedTask: Task | undefined;
  formGroup: FormGroup;
  selectedPriority?: number | null = null;
  users : User[]=[];
  userId : string = localStorage.getItem("userId") as string;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private projectService: ProjectsService,
    private userService : UserService
  ) {
    this.formGroup = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: [],
      projectId: [''],
      userId: [''],
      createdBy: [this.userId],
      status: [''],
      isDeleted: [false],
      subTaskDtos: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadTasks();
    this.getAllProjects();
    this.getAllUser();
  }

  getAllProjects() {
    this.projectService.getAll(1,10).subscribe({
      next: (response: any) => {
        this.projects = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getAllUser() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        const tasks = response.data ? response.data : response;

        this.tasks = tasks.map((task: Task) => {
          if (!Array.isArray(task.subTaskDtos)) {
            if (task.subTaskDtos && typeof task.subTaskDtos === 'object') {
              task.subTaskDtos = Object.values(task.subTaskDtos);
            } else {
              task.subTaskDtos = [];
            }
          }
          return task;
        });
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
    this.selectedTask = JSON.parse(JSON.stringify(task));

    if (!Array.isArray(this.selectedTask?.subTaskDtos)) {
      if (this.selectedTask?.subTaskDtos && typeof this.selectedTask?.subTaskDtos === 'object') {
        this.selectedTask.subTaskDtos = Object.values(this.selectedTask.subTaskDtos);
      } else {
        this.selectedTask!.subTaskDtos = [];
      }
    }

    this.modalService.open(modal);
  }

  addField(): void {
    const control = this.fb.group({
      subTaskName: [''],
      description: [''],
      subTaskProgressPercentage: [0],
      isCompleted: [false],
      subTaskId: ['']
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

  openAddTaskModal(): void {
    this.selectedTask = undefined;
    this.formGroup.reset();
    this.formGroup.setControl('subTaskDtos', this.fb.array([]));
    this.modalService.open(this.editTaskModal);
  }

  updateTask(task: Task): void {
    console.log('Task received in updateTask:', task);
    console.log('Task ID:', task.taskId);

    this.selectedTask = JSON.parse(JSON.stringify(task));

    this.formGroup.reset();
    this.formGroup.setControl('subTaskDtos', this.fb.array([]));

    this.formGroup.patchValue({
      taskId: this.selectedTask?.taskId,
      taskName: this.selectedTask?.taskName,
      description: this.selectedTask?.description,
      dueDate: this.selectedTask?.dueDate,
      priority: this.selectedTask?.priority,
      projectId: this.selectedTask?.projectId,
      userId: this.selectedTask?.userId,
      status: this.selectedTask?.status,
      isDeleted: this.selectedTask?.isDeleted
    });

    this.selectedPriority = this.selectedTask?.priority;

    if (!Array.isArray(this.selectedTask?.subTaskDtos)) {
      if (this.selectedTask?.subTaskDtos && typeof this.selectedTask?.subTaskDtos === 'object') {
        this.selectedTask.subTaskDtos = Object.values(this.selectedTask.subTaskDtos);
      } else {
        this.selectedTask!.subTaskDtos = [];
      }
    }

    if (this.selectedTask?.subTaskDtos && this.selectedTask.subTaskDtos.length > 0) {
      const subTasksFormArray = this.formGroup.get('subTaskDtos') as FormArray;
      this.selectedTask?.subTaskDtos.forEach(subTask => {
        subTasksFormArray.push(this.fb.group({
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
      console.log('Form Data:', formData);

      // تحويل subTaskDtos إلى مصفوفة إذا كانت كائن
      const subTaskDtos = Array.isArray(formData.subTaskDtos)
        ? formData.subTaskDtos
        : Object.values(formData.subTaskDtos || {});

      const payload: Task = {
        taskId: this.selectedTask?.taskId,
        taskName: formData.taskName,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        projectId: formData.projectId,
        userId: formData.userId,
        createdBy: this.userId,
        status: formData.status,
        isDeleted: formData.isDeleted || false,
        subTaskDtos: subTaskDtos.map((subTask: SubTask) => ({
          subTaskId: subTask.subTaskId || null,
          subTaskName: subTask.subTaskName,
          description: subTask.description,
          subTaskProgressPercentage: subTask.subTaskProgressPercentage,
          isCompleted: subTask.isCompleted
        }))
      };

      console.log('Payload being sent:', payload);

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
            this.formGroup.reset();
            this.formGroup.setControl('subTaskDtos', this.fb.array([]));
          },
          error: (error) => {
            console.error('Error adding task', error);
          }
        });
      }
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
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
