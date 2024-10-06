import { Component, OnInit, ViewChild, TemplateRef, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { SubTask, Task } from '../../model/task';
import { NgbDropdownModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from '../../services/projects.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { TruncateTextPipe } from '../../Pipes/truncateText.pipe';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../model/project';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,TruncateTextPipe,NgbModule,NgbDropdownModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  
  @ViewChild('addModal', { static: false }) addModal!:ElementRef ;

  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  subscription!: Subscription;
  addTaskForm!:FormGroup;
  editTaskForm!: FormGroup;
  selectedTaskId!: string;
  listTask:Task[]=[];
  tasks:Task[]=[];
  users:User[]=[];
  projects:Project[]=[];
  ngOnInit(): void {
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
  
    this.initEditForm();
    this.initAddForm();
  
    this.getAllTasks();
    this.getAllUsers();
    this.getAllProjects();
  }
  
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private projectService: ProjectsService,
    private userService : UserService,
    private renderer: Renderer2
  ){

  }
  initEditForm() {
    this.editTaskForm = this.fb.group({
      taskId: [''],
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: [0, Validators.required],
      priority: [0, Validators.required],
      isCompleted: [false, Validators.required],
      projectId: ['', Validators.required],
      userId: ['', Validators.required],
      createdBy: ['', Validators.required],
      isDeleted: [false],
      subTaskDtos: this.fb.array([])
    });
  }
  
  initAddForm() {
    this.addTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: [0, Validators.required],
      priority: [0, Validators.required],
      projectId: ['', Validators.required],
      userId: ['', Validators.required],
      isDeleted: [false],
      subTaskDtos: this.fb.array([])
    });
  }
  

  
createSubTask(): FormGroup {
  return this.fb.group({
      subTaskName: ['', Validators.required],
      description: ['', Validators.required],
      subTaskProgressPercentage: [0, Validators.required],
      isCompleted: [false, Validators.required],
      taskId: ['']
  });
}

  closeModal() {
    if (this.closeButton) {
      this.renderer.selectRootElement(this.closeButton.nativeElement).click();
    }
  }
  get subTaskFormArray(): FormArray {
    return this.editTaskForm.get('subTaskDtos') as FormArray;
  }
  addSubTask() {
    this.subTaskFormArray.push(this.createSubTask());
  }

  removeSubTask(index: number) {
    const subTasks = this.editTaskForm.get('subTaskDtos') as FormArray;
    subTasks.removeAt(index);
  }

  get addSubTaskFormArray(): FormArray {
    return this.addTaskForm.get('subTaskDtos') as FormArray;
  }
  addSubTaskToAddForm() {
    this.addSubTaskFormArray.push(this.createSubTask());
  }
  
  removeSubTaskFromAddForm(index: number) {
    const subTasks = this.addTaskForm.get('subTaskDtos') as FormArray;
    subTasks.removeAt(index);
  }  
  
  getAllUsers(){
    this.userService.getAll().subscribe(
      {
        next:(response)=>{
          this.users=response;
        
        },
        error:(error)=>{

        }
      }
    )
  }
  getAllProjects(){
    this.projectService.getAll(1,10).subscribe({
      next:(response)=>{
        this.projects=response.data;
      },
      error:(error)=>{
        
      }
    })
  }

  getAllTasks(): void {
    this.subscription= this.taskService.getTasks(this.currentPage,this.pageSize).subscribe({
      next: (response) => {
        this.listTask=response.data
        this.totalItems = response.totalItems;
        this.pageSize = response.pageSize;
        this.currentPage = response.pageNumber;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
      complete: () => {
        console.log('Task data fetching completed');
      }
    });
  }

  updateTask() {
    const user: string = localStorage.getItem("userName") as string;
    console.log("Form Values:", this.editTaskForm.value);
    console.log(this.selectedTaskId);
  
    if (!this.editTaskForm.valid) {
      console.error('Form is invalid');
      return;
    }
  
    // تعديل المهام الفرعية لإزالة الحقول غير الضرورية
    const subTaskDtos = this.editTaskForm.get('subTaskDtos')?.value.map((subTask: SubTask) => ({
      subTaskName: subTask.subTaskName,
      description: subTask.description,
      subTaskProgressPercentage: subTask.subTaskProgressPercentage,
      isCompleted: subTask.isCompleted,
      taskId: this.selectedTaskId // نستخدم selectedTaskId
    })) || [];
  
    const updateTask: Task = {
      taskId: this.selectedTaskId,
      status: Number(this.editTaskForm.value.status),
      priority: Number(this.editTaskForm.value.priority),
      taskName: this.editTaskForm.value.taskName,
      description: this.editTaskForm.value.description,
      dueDate: this.editTaskForm.value.dueDate, // تحويل التاريخ إلى صيغة ISO
      isCompleted: this.editTaskForm.value.isCompleted,
      projectId: this.editTaskForm.value.projectId,
      userId: this.editTaskForm.value.userId,
      createdBy: user,
      isDeleted: this.editTaskForm.value.isDeleted,
      subTaskDtos: subTaskDtos
    };
  
    console.log('Payload being sent:', updateTask);
  
    this.taskService.updateTask(this.selectedTaskId, updateTask).subscribe({
      next: (response) => {
        this.closeModal();
        console.log('Task updated successfully', response);
      },
      error: (error) => {
        console.error('Error updating task', error);
        console.log('Validation errors:', error.error.errors);
      }
    });
  }
  
  
  addTask() {
    const user: string = localStorage.getItem("userName") as string;
  
    if (!this.addTaskForm.valid) {
      console.error('Form is invalid');
      return;
    }
  
    const subTaskDtos = this.editTaskForm.get('subTaskDtos')?.value.map((subTask: SubTask) => ({
      subTaskName: subTask.subTaskName,
      description: subTask.description,
      subTaskProgressPercentage: subTask.subTaskProgressPercentage,
      isCompleted: subTask.isCompleted,
      taskId: this.selectedTaskId // تأكد من استخدام selectedTaskId الصحيح
    })) || [];
  
    const newTask: Task = {
      status: Number(this.addTaskForm.value.status),
      priority: Number(this.addTaskForm.value.priority),
      taskName: this.addTaskForm.value.taskName,
      description: this.addTaskForm.value.description,
      dueDate: this.addTaskForm.value.dueDate, // تحويل التاريخ إلى صيغة ISO
      projectId: this.addTaskForm.value.projectId,
      userId: this.addTaskForm.value.userId,
      createdBy: user,
      isDeleted: this.addTaskForm.value.isDeleted,
      subTaskDtos: subTaskDtos
    };
  
    console.log('Payload being sent:', newTask);
  
    this.taskService.addTask(newTask).subscribe({
      next: (response: Task) => {
        console.log('Task added successfully', response);
        this.getAllTasks();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error adding task', error);
        console.log('Validation errors:', error.error.errors);
      }
    });
  }
  

  
  openEditModal(task: Task) {
    this.selectedTaskId = task.taskId!;
    // تعبئة الحقول الرئيسية للمهمة
    this.editTaskForm.patchValue({
      taskId: task.taskId,
      taskName: task.taskName,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      userId: task.userId,
      projectId: task.projectId,
      isCompleted: task.isCompleted,
      createdBy: task.createdBy,
      isDeleted: task.isDeleted,
    });
  
    // تفريغ الـ FormArray الحالي قبل تعبئته بالمهام الفرعية
    this.subTaskFormArray.clear();
  
    // تعبئة المهام الفرعية في الـ FormArray
    if (task.subTaskDtos && task.subTaskDtos.length > 0) {
      task.subTaskDtos.forEach(subTask => {
        const subTaskFormGroup = this.fb.group({
          subTaskId: [subTask.subTaskId],
          subTaskName: [subTask.subTaskName, Validators.required],
          description: [subTask.description, Validators.required],
          subTaskProgressPercentage: [subTask.subTaskProgressPercentage, Validators.required],
          isCompleted: [subTask.isCompleted],
          taskId: [subTask.taskId]
        });
        this.subTaskFormArray.push(subTaskFormGroup);
      });
    }
  }
  
  openSubtasksModal(modal: any, task: Task): void {
    this.modalService.open(modal);
  }

  openAddModal(): void {
    this.initAddForm(); // Initialize the add task form
    this.modalService.open(this.addModal); // Open the add modal
}


}
