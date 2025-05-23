import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { UserService } from '../../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TestPipe, TruncateTextPipe,
    TeamMembersCountPipe, RouterModule, ReactiveFormsModule, NgxPaginationModule, PaginationComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit, OnDestroy {

  @ViewChild('addModal', { static: false }) addModal!: ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;

  pages: number[] = [];
  usersEdit: User[] = []
  users: User[] = [];
  projects: Project[] = [];
  teams: Team[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  subscription!: Subscription;
  addTeamForm!: FormGroup;
  editTeamForm!: FormGroup;
  selectedTeamId!: string;
  teamId!:string;
  createBy!:any;
  constructor(
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private user: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private toastr :ToastrService
  ) { }

  ngOnInit(): void {
    this.createBy=localStorage.getItem('userId');
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;


    this.inintAddFrom();
    this.initEditForm();

    this.getTeams();
    this.getAllUsers();
    this.getAllProjects();

  }
  viewDetails(teamId: string) {
    this.router.navigate(['/dashboard/TeamDetails', teamId])
  }


  initEditForm() {
    this.editTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      description: ['', Validators.required],
      userIds: [[], Validators.required],
      projectId: ['', Validators.required]
    });
  }
  inintAddFrom() {
    this.addTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      description: ['', Validators.required],
      userIds: [[], Validators.required],
      projectId: ['', Validators.required]
    })
  }



  Add() {
    const teamMembers = this.addTeamForm.value.userIds.map((userId: string) => ({
      userId: userId,
      createdBy: localStorage.getItem('userId'),
    }));
    const teamData: Team = {
      ...this.addTeamForm.value,
      createdBy: localStorage.getItem('userId'),
      teamMembers: teamMembers
    };

    console.log(teamData);


    this.teamsService.addTeam(teamData).subscribe({
      next: (response) => {
        this.closeModal()
        this.getTeams();
        this.toastr.success('Team Added successfully');
        console.log('Model ', this.addModal);

      },
      error: (error) => {
        this.toastr.error('Error added team');

      }
    })
  }
  closeModal() {
    if (this.closeButton) {
      this.renderer.selectRootElement(this.closeButton.nativeElement).click();
    }
  }

  getTeams(): void {
   this.createBy= localStorage.getItem('userId') || null;
  
    this.subscription = this.teamsService.getAll(this.currentPage, this.pageSize,this.createBy)
      .subscribe(
        {
          next: (response) => {

            this.teams = response.data;
            this.totalItems = response.totalItems;
            this.pageSize = response.pageSize;
            this.currentPage = response.pageNumber;

          },
          error: (error) => {
            console.log(error);

          }
        }
      );


    
  }


  changePage(pageNumber: number): void {
    this.router.navigate(['dashboard/teams'], {
      relativeTo: this.route,
      queryParams: { pageNumber: pageNumber, pageSize: this.pageSize },
      queryParamsHandling: 'merge'
    });
    this.currentPage = pageNumber;
    this.getTeams();
  }
  generatePages() {
    this.pages = Array.from({ length: this.totalItems }, (_, i) => i + 1);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }


  }

  getAllUsers() {
    this.user.getAll().subscribe(
      {
        next: (response) => {
          this.users = response;

        },
        error: (error) => {

        }
      }
    )
  }
  getAllProjects() {
    this.projectsService.getAll(1,100,this.createBy).subscribe({
      next: (response) => {
        this.projects = response.data;
      },
      error: (error) => {

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
              this.toastr.success('Team Update successfully');
              console.log('team deleted successfully');
              const index = this.teams.findIndex(team => team.teamId === teamId);

              if (index !== -1) {
                this.teams.splice(index, 1);
              }
              // this.toastr.success('team deleted successfully', 'Success');
            },
            error: (error) => {
              this.toastr.error('Error delete team');
              console.error('Error deleting team:', error);
              //this.toastr.error('Error deleting team','Error')
            }
          });
      }
    });
  }



  updateTeam() {

    console.log('data ', this.editTeamForm.value);

    if (this.editTeamForm.invalid) {
      return;
    }

    const teamMembers = this.editTeamForm.value.userIds.map((userId: string) => ({
      userId: userId,
      CreatedBy: localStorage.getItem('userId')
    }));
    const updatedTeam: Team = {
      teamId: this.selectedTeamId,
      ...this.editTeamForm.value,
      // updatedBy: localStorage.getItem('userId'),
      CreatedBy:localStorage.getItem('userId'),
      teamMembers: teamMembers,
    };

    console.log(updatedTeam);

    this.teamsService.update(this.teamId,updatedTeam).subscribe({
      next: (response) => {
        this.toastr.success('Team Update successfully');
        this.closeModal()

        this.getTeams();
      },
      error: (error) => {
        this.toastr.error('Error update team');
        console.log(error);
      }
    });
  }


  openEditModal(team: Team) {
    this.teamId=team.teamId;
    this.usersEdit = this.users.filter(user => team.teamMembers.some(member => member.userId === user.id));

    this.selectedTeamId = team.teamId;
    this.editTeamForm.patchValue({
      teamName: team.teamName,
      description: team.description,
      userIds: team.teamMembers.map(member => member.userId),
      projectId: team.projectId,
      
    });

  }
}