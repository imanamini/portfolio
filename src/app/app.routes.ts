import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio-v2/portfolio-v2').then(m => m.PortfolioV2Component),
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
    path: 'resume/v3',
    loadComponent: () => import('./resume-v3/resume-v3').then(m => m.ResumeV3Component)
  },
  {
    path: 'deck/digipay-libs',
    loadComponent: () => import('./digipay-deck/digipay-deck').then(m => m.DigipayDeckComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
