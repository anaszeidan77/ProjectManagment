import { Routes } from '@angular/router';
import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';
import { TaskComponent } from './components/task/task.component';

export const routes: Routes =
[
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
  {path: 'tasks',loadComponent:()=>import('./components/task/task.component')
    .then(t=>t.TaskComponent)
  }
];
