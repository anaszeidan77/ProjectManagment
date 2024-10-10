import { Routes } from '@angular/router';

import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';
import { authGuard } from './guards/auth.guard';
import { TeamComponent } from './components/team/team.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/auth/user/user.component';
import { PrjectDetailsComponent } from './components/project-details/project-details.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { ManagePermissionsComponent } from './components/manage-permissions/manage-permissions.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProjectStatisticsComponent } from './components/project-statistics/project-statistics.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    resolve: {
      layout: () => setLayout(PageLayout.Dashboard)
    },
    children: [
    ]
  },
  { path: 'teams', component: TeamComponent },
  { path: 'TeamDetails/:Id', component: TeamDetailsComponent },
  { path: 'tasks', component: TaskComponent }, // استخدام التحميل العادي
  { path: 'Statistics', component: StatisticsComponent },
  { path: 'users', component: UserComponent }, // استخدام التحميل العادي
  { path: 'project-details/:id', component: PrjectDetailsComponent }, // استخدام التحميل العادي
  { path: 'task-details/:Id', component: TaskDetailsComponent }, // استخدام التحميل العادي
  { path: 'teams/:Id', component: TeamDetailsComponent }, // استخدام التحميل العادي
  { path: 'ManagePermissions/:Id', component: ManagePermissionsComponent }, // استخدام التحميل العادي
  { path: 'roles', component: RoleListComponent }, // استخدام التحميل العادي
  { path: 'profile', component: UserProfileComponent }, // استخدام التحميل العادي
  { path: 'projects', component: ProjectListComponent }, 
  { path: 'statistics-project-details/:id', component: ProjectStatisticsComponent }, 
  {
    path: 'login',
    component: AuthComponent // تركه كما هو
  },
];
