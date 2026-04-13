import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home">
      <h1>Iman Amini</h1>
      <p>Front-End Developer</p>
      <a routerLink="/resume">View Resume</a>
    </div>
  `,
  styles: [`
    .home {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 1rem;
      font-family: 'Inter', sans-serif;
    }
    h1 { font-size: 2.5rem; font-weight: 700; }
    p { color: #6b7280; }
    a {
      margin-top: 0.5rem;
      padding: 0.6rem 1.4rem;
      background: #16a34a;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
    }
  `]
})
export class HomeComponent {}
