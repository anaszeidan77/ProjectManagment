import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { setLayout } from './resolvers/layout.resolver';
import { PageLayout } from './enums/page-layout.enum';

export const routes: Routes =
[


  {path:'test',component:TestComponent},

  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    resolve: {
      layout: () => setLayout(PageLayout.Dashboard)
    },
    children: [
      { path: 'test', component: TestComponent }
    ]
  },

  {path:'userInterface',loadComponent:() =>import ('./components/dashboard/dashboard.component').then(d=>d.DashboardComponent),
    resolve:{
      layout:setLayout(PageLayout.UserInterface)
    },
   
  },
];
