import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isloading: boolean = false;
  messError: string = '';

  loginform: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  submitForm(): void {
    console.log(this.loginform);
    this.isloading = true;
    if (this.loginform.valid) {
      this.authService.sendLoginData(this.loginform.value).subscribe({
        next: (result) => {
          console.log(result);
          if (result.message === 'success') {
            console.log('register success');

            setTimeout(() => {
              localStorage.setItem('token', result.token);
              this.authService.getUserdata();
              this.router.navigate(['/home']);
            }, 1000);
          }
          this.isloading = false;
        },
        error: (error) => {
          console.log(error);
          this.messError = error.error.message;
          this.isloading = false;
        },
      });
    }
  }
}
