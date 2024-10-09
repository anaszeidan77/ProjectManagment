// project-list.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Project } from '../../model/project';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // إضافة الاستيراد
import { StatusPipe } from '../../Pipes/status.pipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,StatusPipe,NgbDropdownModule,FormsModule,ReactiveFormsModule], // إضافة الوحدات المستوردة
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit,OnDestroy {
  projects: Project[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  addprojectForm!:FormGroup;
  subscription!: Subscription;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private router:Router,
    
  ) { }

  ngOnInit(): void {
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
    this.getAllProjects();
    this.initAddForm();
  }

  initAddForm() {
    this.addprojectForm = this.fb.group({
      projectId: [''],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, Validators.required],
      status: [0, Validators.required],
      isDeleted: [false, Validators.required],
      documents: this.fb.array([]),
      resources: this.fb.array([])
    });
  }
  

// project-list.component.ts
getAllProjects(): void {
  this.subscription = this.projectService.getAll(this.currentPage, this.pageSize).subscribe({
    next: (response) => {
      console.log('API Response:', response);
      this.projects = response.data;
      this.totalItems = response.totalItems;
      this.pageSize = response.pageSize;
      this.currentPage = response.pageNumber;
      console.log('Projects:', this.projects);
    },
    error: (err) => {
      console.log('Error:', err);
    },
  });
}
get documentsFormArray() {
  return this.addprojectForm.get('documents') as FormArray;
}

addDocument() {
  const documentForm = this.fb.group({
    documentName: ['', Validators.required],
    type: [0, Validators.required],
    documentURL: ['', Validators.required],
    uploadedDate: ['', Validators.required],
    createdBy: [localStorage.getItem("userName") as string],
    createdAt: [new Date()],
    isDeleted: [false]
  });
  this.documentsFormArray.push(documentForm);
}

removeDocument(index: number) {
  this.documentsFormArray.removeAt(index);
}

get resourcesFormArray() {
  return this.addprojectForm.get('resources') as FormArray;
}

addResource() {
  const resourceForm = this.fb.group({
    resourceName: ['', Validators.required],
    type: [0, Validators.required],
    resourceStatus: ['', Validators.required],
    createdBy: [localStorage.getItem("userName") as string],
    createdAt: [new Date()],
    isDeleted: [false]
  });
  this.resourcesFormArray.push(resourceForm);
}

removeResource(index: number) {
  this.resourcesFormArray.removeAt(index);
}


add(): void {
  if (!this.addprojectForm.valid) {
    console.log("Data is not valid");
    return;
  }

  const newProject: Project = {
    projectName: this.addprojectForm.value.projectName,
    description: this.addprojectForm.value.description,
    startDate: this.addprojectForm.value.startDate,
    endDate: this.addprojectForm.value.endDate,
    budget: this.addprojectForm.value.budget,
    status: this.addprojectForm.value.status,
    isDeleted: this.addprojectForm.value.isDeleted,
    createdBy: localStorage.getItem("userName") as string,
    createdAt: new Date(),
    documents: this.addprojectForm.value.documents,
    resources: this.addprojectForm.value.resources
  };

  this.projectService.addProject(newProject).subscribe({
    next:(response)=>{
      console.log("Project added successfully:", response);
    },
    error:(err) => {
      console.error("Error adding project:", err);
    }
  }
  );
}

changePage(event: any): void {
  this.currentPage = event;
  
  // تحديث الـ Query Parameters
  this.router.navigate(['/projects'], {
    queryParams: {
      pageNumber: this.currentPage,
      pageSize: this.pageSize
    },
  });
  
  // استدعاء دالة الحصول على البيانات
  this.getAllProjects();
}


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
