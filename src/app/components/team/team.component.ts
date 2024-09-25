import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../../model/team';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from '../../Pipes/truncateText.pipe';
import { TestPipe } from "../../Pipes/test.pipe";
import { TeamMembersCountPipe } from "../../Pipes/teamMembersCount.pipe";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';
import { Project } from '../../model/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TestPipe, TruncateTextPipe,
     TeamMembersCountPipe,RouterModule,ReactiveFormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit,OnDestroy {





  users:User[]=[];
  projects:Project[]=[];
  teams: Team[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  subscription!: Subscription;
  addTeamForm!:FormGroup;
  editTeamForm!: FormGroup;
  selectedTeamId!: string;


  constructor(
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService:ProjectsService,
    private user:AuthService,
    private fb:FormBuilder,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
  
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;


   
    
    this.inintAddFrom();
    this.initEditForm();

    this.getTeams();
    this.getAllUsers();
    this.getAllProjects();

    

  }
  initEditForm() {
    this.editTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      description: ['', Validators.required],
      userIds: [[], Validators.required],
      projectId: ['', Validators.required]
    });
  }
  inintAddFrom(){
    this.addTeamForm=this.fb.group({
      teamName:['',Validators.required],
      description:['',Validators.required],
      userIds: [[], Validators.required],
      projectId:['',Validators.required]
    })
  }
 


  Add() {
    const teamMembers = this.addTeamForm.value.userIds.map((userId: string) => ({
      userId: userId,
      createdBy: 'admin'  
    }));
    const teamData: Team = {
      ...this.addTeamForm.value,
      createdBy: 'admin',//current user
      teamMembers: teamMembers  
    };
  
  console.log(teamData);
  
  
    this.teamsService.addTeam(teamData).subscribe({
      next:(response)=>{
        console.log('sussess');
        
      },
      error:(error)=>{
        console.log('errors');
        
      }
    })
  }
  
  getTeams(): void {
    this.subscription = this.teamsService.getAll(this.currentPage, this.pageSize)
    .subscribe(
      {
        next:(response)=>{
           
            this.teams = response.data;
            this.totalItems = response.totalItems;
            this.pageSize = response.pageSize;
            this.currentPage = response.pageNumber;
          
        },
        error:(error)=>{
console.log(error);

        }
      }
    );
  }


  changePage(pageNumber: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pageNumber: pageNumber, pageSize: this.pageSize },
      queryParamsHandling: 'merge'
    });
    this.currentPage = pageNumber;
    this.getTeams();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


  }
  

   

  getAllUsers(){
    this.user.getAll().subscribe(
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
    this.projectsService.getAll().subscribe({
      next:(response)=>{
        this.projects=response.data;
      },
      error:(error)=>{
        
      }
    })
  }
  deleteTeam(teamId: string) {    
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = 'Are you sure you want to delete this teame?';

    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.teamsService.delete(teamId)
          .subscribe({
            next: (response) => {
              // Handle successful deletion (optional: remove from UI)
              console.log('team deleted successfully');
              const index = this.teams.findIndex(team => team.teamId === teamId);
            
              // if (index !== -1) {
              //   this.teams.splice(index, 1);
              // }
             // this.toastr.success('team deleted successfully', 'Success');
            },
            error: (error) => {
              // Handle deletion error
              console.error('Error deleting team:', error);
              //this.toastr.error('Error deleting team','Error')
            }
          });
      }
    });
  }



  updateTeam() {
    console.log('data ',this.editTeamForm.value);
    
    if (this.editTeamForm.invalid) {
      return;
    }

    const teamMembers = this.editTeamForm.value.userIds.map((userId: string) => ({
      userId: userId,
      updatedBy: 'admin'  // يمكن تغيير 'admin' إلى المستخدم الحالي إذا كان متاحًا
    }));
    const updatedTeam: Team = {
      teamId: this.selectedTeamId,
      ...this.editTeamForm.value,
      updatedBy: 'admin', // المستخدم الحالي
      teamMembers: teamMembers  
    };
  
    console.log(updatedTeam);
  
    this.teamsService.update(updatedTeam).subscribe({
      next: (response) => {
        console.log(response);
        
        console.log('تم التعديل بنجاح');
        this.modalService.dismissAll(); // إغلاق الـ Modal بعد التعديل
        this.getTeams(); // تحديث قائمة الفرق
      },
      error: (error) => {
        console.log('حدث خطأ أثناء التعديل', error);
      }
    });
  }

    // فتح نافذة تعديل الفريق
    openEditModal(team: Team) {
      this.selectedTeamId = team.teamId;
      this.editTeamForm.patchValue({
        teamName: team.teamName,
        description: team.description,
        userIds: team.teamMembers.map(member => member.userId),
        projectId: team.projectId
      });
  
   //   this.modalService.open('editModal'); // فتح الـ Modal بواسطة المعرف
    }
}






