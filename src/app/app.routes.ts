import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio-v2/portfolio-v2').then((m) => m.PortfolioV2Component),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'resume',
    loadComponent: () => import('./resume/resume').then((m) => m.ResumeComponent),
  },
  {
    path: 'resume/v1',
    loadComponent: () => import('./resume-v1/resume-v1').then((m) => m.ResumeV1Component),
  },
  {
    path: 'resume/v2',
    loadComponent: () => import('./resume-v2/resume-v2').then((m) => m.ResumeV2Component),
  },
  {
    path: 'resume/v3',
    loadComponent: () => import('./resume-v3/resume-v3').then((m) => m.ResumeV3Component),
  },
  {
    path: 'new-fable',
    loadComponent: () => import('./new-fable/new-fable').then((m) => m.NewFableComponent),
  },
  {
    path: 'new-opus',
    loadComponent: () => import('./new-opus/new-opus').then((m) => m.NewOpusComponent),
  },
  {
    path: 'deck/digipay-libs',
    loadComponent: () => import('./digipay-deck/digipay-deck').then((m) => m.DigipayDeckComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'learn',
    canActivate: [authGuard],
    loadComponent: () => import('./learn-hub/learn-hub').then((m) => m.LearnHubComponent),
  },
  {
    path: 'learn-react',
    canActivate: [authGuard],
    loadComponent: () => import('./learn-react/learn-react').then((m) => m.LearnReactComponent),
  },
  {
    path: 'finance',
    canActivate: [authGuard],
    loadComponent: () => import('./finance/finance').then((m) => m.FinanceComponent),
  },
  {
    path: 'expenses',
    canActivate: [authGuard],
    loadComponent: () => import('./expenses/expenses').then((m) => m.ExpensesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
