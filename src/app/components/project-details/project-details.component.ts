import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../model/project';
import { Task } from '../../model/task';
import { Team } from '../../model/team';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPipe } from '../../Pipes/status.pipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncateTextPipe } from '../../Pipes/truncateText.pipe';

@Component({
  selector: 'app-prject-details',
  standalone: true,
  imports: [CommonModule,FormsModule,StatusPipe,NgbDropdownModule,TruncateTextPipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class PrjectDetailsComponent implements OnInit{
  projectId!:string;
  project! : Project;
  constructor(private route: ActivatedRoute,
              private projectService : ProjectsService,
              private router : Router){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.projectId=params['Id']
      console.log('taskid',this.projectId);
      this.getProjectById()
    });
  }

  getProjectById(){
    this.projectService.getProjectById(this.projectId).subscribe({
      next:(response)=>{
        console.log("response ",response);
        this.project=response;
      }
    })
  }
  viweTaskDetails(taskId:string):void{
    this.router.navigate(['/dashboard/task-details',taskId])
  }
  downloadDocument(documentURL: string): void {
    const a = document.createElement('a');
    a.href = documentURL; // استخدم الرابط المباشر
    a.download = documentURL; // يمكنك وضع اسم الملف هنا إذا كنت تريد
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  viewTeamDetails(teamId:string) {
    this.router.navigate(['/dashboard/TeamDetails',teamId])
  }
}
