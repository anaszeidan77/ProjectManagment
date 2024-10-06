import { Routes } from '@angular/router';
import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';

import { TeamComponent } from './components/team/team.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TaskComponent } from './components/task/task.component';
import { authGuard } from './guards/auth.guard';
import { RoleListComponent } from './components/role-list/role-list.component';
import { ManagePermissionsComponent } from './components/manage-permissions/manage-permissions.component';

export const routes: Routes =
[
  {path:'tasks',component:TaskComponent},
  {path:'teams',component:TeamComponent},
  {path:'roles',component:RoleListComponent},
  {path:'ManagePermissions/:Id',component:ManagePermissionsComponent},
  {path:'TeamDetails/:Id',component:TeamDetailsComponent},
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
    path: 'users',loadComponent:()=>import('./components/auth/user/user.component')
    .then(u => u.UserComponent),
    canActivate:([authGuard])
  },
  {
    path:'login',loadComponent:()=>import('./components/auth/auth.component')
    .then(l=>l.AuthComponent)
  },
  {
    path:'profile',loadComponent:()=>import('./components/user-profile/user-profile.component')
    .then(l=>l.UserProfileComponent)
  },
  {
    path:'projects',loadComponent:()=>import('./components/project-list/project-list.component')
    .then(p=>p.ProjectListComponent)
  }

];
