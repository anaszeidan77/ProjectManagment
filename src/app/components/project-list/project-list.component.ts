import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Resource } from '../../model/project';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../../Pipes/status.pipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, StatusPipe, NgbDropdownModule, ReactiveFormsModule,NgxPaginationModule], // إضافة الوحدات المستوردة
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {


  projects: Project[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  subscription!: Subscription;


  projectForm!: FormGroup;
  projectFormEdit!: FormGroup;
  documentFiles: File[] = [];
  projectId!: string;
  //resources: Resource[] = [];

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ) { }

  initFormAdd() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, Validators.required],
      totalProgressPercentageProject: [0],
      status: [1, Validators.required],
      createdBy: ['', Validators.required],
      userId: ['', Validators.required],
      documents: this.fb.array([]),
      resources: this.fb.array([])
    });
  }
  initFormEdit() {
    this.projectFormEdit = this.fb.group({
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, Validators.required],
      totalProgressPercentageProject: [0],
      status: [1, Validators.required],
      createdBy: ['', Validators.required],
      userId: ['', Validators.required],
      documents: this.fb.array([]),

    });
  }
  ngOnInit(): void {
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
    this.getAllProjects();
    this.initFormAdd()
    this.initFormEdit();
    
    
  }


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



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete(projectId: string) {
    this.projectService.delete(projectId).subscribe({
      next: (response) => {
        console.log('suss');

      },
      error: (error) => {
        console.log(error);

      }
    })
  }


  get documents(): FormArray {
    return this.projectForm.get('documents') as FormArray;
  }

  get resources(): FormArray {
    return this.projectForm.get('resources') as FormArray;
  }

  get documentsEdit(): FormArray {
    return this.projectFormEdit.get('documents') as FormArray;
  }

  addDocument(): void {
    const documentGroup = this.fb.group({
      documentName: ['', Validators.required],
      type: [1, Validators.required],
      documentURL: ['', Validators.required],
      uploadedDate: [new Date(), Validators.required],
      createdBy: ['', Validators.required]
    });
    this.documents.push(documentGroup);
  }
  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.documentFiles.push(files[i]);
    }
  }



  AddProject(): void {
    this.projectForm.patchValue({
      createdBy: localStorage.getItem('userName'),
      userId: localStorage.getItem('userId')
    });
    console.log('Submitted Data:', this.projectForm.value);
    const formData = new FormData();
    Object.keys(this.projectForm.value).forEach(key => {
      if (key !== 'documents' && key !== 'resources') {
        formData.append(key, this.projectForm.value[key]);
      }
    });

    this.projectForm.value.documents.forEach((doc: any, index: number) => {
      formData.append(`documents[${index}]`, JSON.stringify(doc));
    });

    this.documentFiles.forEach(file => formData.append('documentFiles', file, file.name));

    console.log('data : ', this.projectForm.value);

    this.projectService.addProject(formData).subscribe({
      next: () => alert('Project added successfully!'),
      error: err => console.error('Error:', err)
    });
  }




  loadProjectData(projectId: string): void {
    this.projectService.getProjectById(projectId).subscribe({
      next: (project) => {
        console.log('data', project);
        this.projectId = project.projectId;
        project.startDate = project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : null;
        project.endDate = project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : null;

        console.log('Date:', project.startDate, project.endDate);

        this.projectFormEdit.patchValue(project);
        this.setDocuments(project.documents);
      },
      error: (err) => console.error('Error loading project:', err)
    });
  }



  isImage(fileUrl: string): boolean {
    return fileUrl.match(/\.(jpeg|jpg|gif|png|bmp)$/i) != null;
  }



  onFileChangeEdit(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.documentFiles[index] = file;
      const reader = new FileReader();
      reader.onload = () => {

        const documentControl = this.documentsEdit.at(index);
        if (documentControl) {
          documentControl.patchValue({ documentURL: reader.result as string });
        } else {
          console.error('Document control is undefined for index:', index);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  //NEw Funcation
  setDocuments(documents: any[]): void {
    const documentArray = this.projectFormEdit.get('documents') as FormArray;
    documentArray.clear();

    documents.forEach((doc) => {
      const documentGroup = this.fb.group({
        documentName: [doc.documentName, Validators.required],
        type: [doc.type, Validators.required],
        documentURL: [doc.documentURL || '', Validators.required],

        uploadedDate: [doc.uploadedDate ? new Date(doc.uploadedDate).toISOString().split('T')[0] : '', Validators.required],
        createdBy: [doc.createdBy, Validators.required]
      });
      console.log('uploadedDate', doc.uploadedDate);

      documentArray.push(documentGroup);
    });
  }




  Update() {
    this.projectFormEdit.patchValue({
      createdBy: 'Ibrahim Alomar',
   
    });
    const formData = new FormData();

    Object.keys(this.projectFormEdit.value).forEach(key => {
      if (key !== 'documents' && key !== 'projectId') {
        formData.append(key, this.projectFormEdit.value[key]);
      }
    });

    this.projectFormEdit.value.documents.forEach((doc: any, index: number) => {
      formData.append(`documents[${index}]`, JSON.stringify(doc));
    });

    this.documentFiles.forEach(file => formData.append('documentFiles', file, file.name));


    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });


    this.projectService.updateProject(this.projectId, formData).subscribe({
      next: () => console.log('Update successful'),
      error: err => console.error('Error updating project:', err)
    });
  }

  changePage(pageNumber: number): void {
    this.router.navigate(['/projects'], {
      relativeTo: this.route,
      queryParams: { pageNumber: pageNumber, pageSize: this.pageSize },
      queryParamsHandling: 'merge'
    });
    this.currentPage = pageNumber;
    this.getAllProjects();
  }

  projectDetails(id:string){
    this.router.navigate(['project-details',id])
  }
}