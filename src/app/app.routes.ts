

import { Routes } from '@angular/router';
import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent)
  },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      
      {
        path: '',
        resolve: {
          layout: () => setLayout(PageLayout.Dashboard)
        },
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
          {
            path: 'tasks',
            loadComponent: () => import('./components/task/task.component').then(m => m.TaskComponent)
          },
          {
            path: 'teams',
            loadComponent: () => import('./components/team/team.component').then(m => m.TeamComponent)
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
            path: 'users',
            loadComponent: () => import('./components/auth/user/user.component').then(m => m.UserComponent)
          },
          {
            path: 'projects',
            loadComponent: () => import('./components/project-list/project-list.component').then(m => m.ProjectListComponent)
          },
          {
            path: 'profile',
            loadComponent: () => import('./components/user-profile/user-profile.component').then(m => m.UserProfileComponent)
          },
          {
            path: 'task-details/:Id',
            loadComponent: () => import('./components/task-details/task-details.component').then(td => td.TaskDetailsComponent)
          },
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          }
        ]
      },

      {
        path: 'userInterface',
        resolve: {
          layout: () => setLayout(PageLayout.UserInterface)
        },
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }

    ]
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
