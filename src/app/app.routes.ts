
import { Routes } from '@angular/router';

import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { TeamComponent } from './components/team/team.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AccessDeniedComponent } from './components/shared/access-denied/access-denied.component';

export const routes: Routes =
  [
    // {path:'tasks',component:TaskComponent},
    { path: 'teams', component: TeamComponent },
    { path: 'TeamDetails/:Id', component: TeamDetailsComponent },
    {
      path: 'dashboard',
      loadComponent: () => import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
      canActivate: ([authGuard]),
      resolve: {
        layout: () => setLayout(PageLayout.Dashboard)
      },
      children: [
        
      ]
    },

    {
      path: 'userInterface', loadComponent: () => import('./components/dashboard/dashboard.component').then(d => d.DashboardComponent),
      resolve: {
        layout: setLayout(PageLayout.UserInterface)
      },

    },

    {
      path: 'tasks', loadComponent: () => import('./components/task/task.component')
        .then(t => t.TaskComponent),
      canActivate: ([authGuard]),
    },

    {
      path:'accessDenied',component:AccessDeniedComponent
    },

    {path:'Statistics',component:StatisticsComponent},

    {
      path: 'users', loadComponent: () => import('./components/auth/user/user.component')
        .then(u => u.UserComponent),
      canActivate: ([authGuard])
    },
    {
      path: 'project-details/:id', loadComponent: () => import('./components/project-details/project-details.component')
        .then(u => u.PrjectDetailsComponent),
      canActivate: ([authGuard])
    },
    {
      path: 'task-details/:Id',
      loadComponent: () => import('./components/task-details/task-details.component').then(td => td.TaskDetailsComponent)
    },
    {
      path: 'teams/:Id',
      loadComponent: () => import('./components/team-details/team-details.component').then(m => m.TeamDetailsComponent)
    },
    {
      path: 'ManagePermissions/:Id',
      loadComponent: () => import('./components/manage-permissions/manage-permissions.component').then(m => m.ManagePermissionsComponent)
    },
    {
      path: 'roles',
      loadComponent: () => import('./components/role-list/role-list.component').then(m => m.RoleListComponent)
    },


    {
      path: 'login', loadComponent: () => import('./components/auth/auth.component')
        .then(l => l.AuthComponent)
    },
    {
      path: 'profile', loadComponent: () => import('./components/user-profile/user-profile.component')
        .then(l => l.UserProfileComponent)
    },
    {
      path: 'projects', loadComponent: () => import('./components/project-list/project-list.component')
        .then(p => p.ProjectListComponent)
    }

  ];
