import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../../model/team';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from '../../Pipes/truncateText.pipe';
import { TestPipe } from "../../Pipes/test.pipe";
import { TeamMembersCountPipe } from "../../Pipes/teamMembersCount.pipe";

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, TestPipe, TruncateTextPipe, TeamMembersCountPipe,RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit,OnDestroy {



  teams: Team[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  subscription!: Subscription;

  constructor(
    private teamsService: TeamsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
  
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('pageNumber')) || 1;
    this.pageSize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || 10;


    this.getTeams();
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
  

   
  
}









