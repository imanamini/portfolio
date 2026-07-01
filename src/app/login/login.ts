import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private auth   = inject(AuthService);
  private router = inject(Router);

  email    = signal('');
  password = signal('');
  error    = signal('');

  get loading() { return this.auth.isLoading; }

  async onSubmit(e: Event) {
    e.preventDefault();
    this.error.set('');
    const result = await this.auth.login(this.email(), this.password());
    if (result.error) {
      this.error.set(result.error);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
