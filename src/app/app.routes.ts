import { Routes } from '@angular/router';
import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';
import { TaskComponent } from './components/task/task.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes =
[
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate:([authGuard]),
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
    .then(t=>t.TaskComponent),
    canActivate:([authGuard]),
  },
  {
    path:'',loadComponent:()=>import('./components/auth/auth.component')
    .then(l=>l.AuthComponent)
  }
];
