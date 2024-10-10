import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { PriorityPipe } from '../../Pipes/priority.pipe';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../model/team';
import { Subscription } from 'rxjs';
import { TeamMember } from '../../model/TeamMember';
import { TruncateTextPipe } from '../../Pipes/truncateText.pipe';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PriorityPipe, CommonModule,TruncateTextPipe],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  selectedTask: any;
  tasks: Task[] = [];
  completeTask: boolean = false;
  userName: string = localStorage.getItem("userName") as string;
  email: string = localStorage.getItem("email") as string;
  roles: string = localStorage.getItem("roles") as string;
  pageSize: number = 10;
  currentPage: number = 1;
  teams: Team[] = [];
  totalItems: number = 0;
  subscription!: Subscription;

  constructor(
    private taskServices: TaskService,
    private modalService: NgbModal,
    private teamService : TeamsService,
    private route: ActivatedRoute,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;
    this.getTeams();
    this.getTaskByUser();
  }

  userId = localStorage.getItem("userId");
  
  getTaskByUser(): void {
    this.taskServices.getTaskByUserId(this.userId!).subscribe({
      next: (tasks: Task[]) => {
        console.log(tasks);
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
  getTeams(): void {
    this.subscription = this.teamService.getAll(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {

          const userId = localStorage.getItem('userId');
          
          this.teams = response.data.filter((team: Team) => {
            return team.teamMembers && team.teamMembers.some((member: TeamMember) => member.userId === userId);
          });
  
          this.totalItems = this.teams.length;
          this.pageSize = response.pageSize;
          this.currentPage = response.pageNumber;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  

  onSubTaskSelected(sub: any, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    sub.isCompleted = inputElement.checked;
  }

  saveSubTasks() {

    const updatedSubTasksTrue = this.selectedTask.subTaskDtos.filter((sub: any) => {
      return sub.isCompleted; 
    });
    updatedSubTasksTrue.forEach((sub: any) => {
      this.updateSubTask(sub.subTaskId);
    });


    this.closeModel(); 
  }

  updateSubTask(subTaskId: string) {
    this.taskServices.updateSubTask(subTaskId).subscribe({
      next: (res) => {
        console.log(`Subtask ${subTaskId} updated successfully:`, res);
      },
      error: (err) => {
        console.error(`Error updating subtask ${subTaskId}:`, err);
      }
    });
  }

  openEditModal(task: Task, modal: any): void {
    this.selectedTask = task;
    this.modalService.open(modal);
  }
  viewDetails(teamId:string) {
    this.router.navigate(['/TeamDetails',teamId])
  }

  closeModel() {
    this.modalService.dismissAll();
  }
}
