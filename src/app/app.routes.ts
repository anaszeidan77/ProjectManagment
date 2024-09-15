import { Routes } from '@angular/router';
import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';

import { TeamComponent } from './components/team/team.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes =
[
  {path:'tasks',component:TaskComponent},
  {path:'teams',component:TeamComponent},
  {path:'TeamDetails/:Id',component:TeamDetailsComponent},
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    resolve: {
      layout: () => setLayout(PageLayout.Dashboard)
    },
    children: [
      
    ]
  },

  {path:'userInterface',loadComponent:() =>import ('./components/dashboard/dashboard.component').then(d=>d.DashboardComponent),
    resolve:{
      layout:setLayout(PageLayout.UserInterface)
    },
   
  },
  


  // {path: 'tasks',loadComponent:()=>import('./components/task/task.component')
  //   .then(t=>t.TaskComponent)
  // }
];
