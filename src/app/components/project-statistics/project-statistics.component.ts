import { Component, OnInit } from '@angular/core';
import { ProjectStatisticsDto } from '../../model/ProjectStatisticsDto';
import { StatisticsService } from '../../services/statistics.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-statistics',
  standalone: true,
  imports: [],
  templateUrl: './project-statistics.component.html',
  styleUrl: './project-statistics.component.css'
})
export class ProjectStatisticsComponent implements OnInit{

  projectId!:string;
  StatisticsProject! : ProjectStatisticsDto;
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.projectId=params['id']
      this.getStatisticsByProject()
    });
  }
  constructor(private statisticsServices:StatisticsService,private route : ActivatedRoute){}

  getStatisticsByProject(){
    this.statisticsServices.getStatisticsByProject(this.projectId).subscribe({
      next:(response)=>{
        this.StatisticsProject = response
      },
      error(err) {
        console.log(err);
      },
    })
  }
  
}
