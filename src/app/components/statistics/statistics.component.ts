import { Component, OnInit } from '@angular/core';
import { StatisticsDto } from '../../model/Statistics';
import { StatisticsService } from '../../services/statistics.service';
import { CommonModule } from '@angular/common';

declare var Chart: any;
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{


  statistics: StatisticsDto | null = null;
  barChart: any;
  pieChart: any;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (response) => {
        this.statistics = response;
        this.createCharts(); 
      },
      error: (error) => {
        console.error('Error fetching statistics:', error);
      }
    });
  }

  createCharts() {
    if (this.statistics) {
      // إعداد المخطط العمودي
      this.barChart = new Chart('barChart', {
        type: 'bar',
        data: {
          labels: this.statistics.projects.map(project => project.projectName),
          datasets: [{
            label: 'Main Tasks Count',
            data: this.statistics.projects.map(project => project.mainTasksCount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // إعداد المخطط الدائري
      this.pieChart = new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['Completed Projects', 'Incomplete Projects'],
          datasets: [{
            label: 'Project Status',
            data: [
              this.statistics.totalCompletedProjects,
              this.statistics.totalIncompleteProjects
            ],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {}
      });
    }
  }
}
