import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../model/team';
import { TeamMember } from '../../model/TeamMember';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.css'
})
export class TeamDetailsComponent implements OnInit {

  teamId!:string;
  team!:Team;
  searchQuery: string = ''; 
  filteredTeamMembers: TeamMember[] = [];
  constructor(private route: ActivatedRoute,private teamService:TeamsService){}
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.teamId = params['Id'];
      console.log('teamId',this.teamId);
      
     
    });
    console.log(this.searchQuery);
    console.log(this.filteredTeamMembers);
    
    
    console.log(this.teamId);
    
this.getTeamById(this.teamId);
  }



  getTeamById(Id:string){
    this.teamService.getById(Id).subscribe(
      {
      next:(response)=>{
        this.team=response;
        this.filteredTeamMembers = this.team.teamMembers;
        console.log(this.team);
        
      },
      error:(error)=>{

      }
      }
    )
  }


  filterTeamMembers(): void {
    console.log(this.searchQuery);
    
    if (this.searchQuery.trim() === '') {
       this.filteredTeamMembers = this.team.teamMembers;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredTeamMembers = this.team.teamMembers.filter(member =>
        (member.firstName?.toLowerCase().includes(query) || member.lastName?.toLowerCase().includes(query))
      );
    }
  }
}

