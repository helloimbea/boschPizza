import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  errorMessage = '';

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  submit(): void{
    if (this.form.invalid){
      this.form.markAllAsTouched();
    }

    this.loading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.authService.login(this.form.getRawValue() as { username: string, password: string}).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error: () =>{
        this.errorMessage = 'Usuário ou senha inválidos';
        this.loading = false;
        this.cdr.markForCheck();

      },
      complete: () => {
        this.loading = false;
        this.cdr.markForCheck();

      }
    })
  }
  goToRegister() {
  this.router.navigate(['/register']);
}
}
