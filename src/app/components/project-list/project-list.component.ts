// project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../model/project';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // إضافة الاستيراد
import { StatusPipe } from '../../Pipes/status.pipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule,StatusPipe,NgbDropdownModule], // إضافة الوحدات المستوردة
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  subscription!: Subscription;

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
    this.getAllProjects();
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


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
