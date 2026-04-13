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
    path: 'resume/v1',
    loadComponent: () => import('./resume-v1/resume-v1').then(m => m.ResumeV1Component)
  },
  {
    path: 'resume/v2',
    loadComponent: () => import('./resume-v2/resume-v2').then(m => m.ResumeV2Component)
  },
  {
    path: '**',
    redirectTo: 'resume'
  }
];
