import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'resume',
    pathMatch: 'full'
  },
  {
    path: 'resume',
    loadComponent: () => import('./resume/resume').then(m => m.ResumeComponent)
  },
  {
    path: '**',
    redirectTo: 'resume'
  }
];
