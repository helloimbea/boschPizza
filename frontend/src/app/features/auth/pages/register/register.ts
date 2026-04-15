import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  message = '';

form = this.fb.nonNullable.group({
  username: ['', [Validators.required, Validators.minLength(3)]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  nome: ['', [Validators.required, Validators.minLength(3)]],
  isAdmin: [false] // default: usuário normal
});

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força mostrar erros
      return;
    }

    this.auth.register(this.form.getRawValue()).subscribe({
      next: () => {
        this.message = 'Conta criada com sucesso!';
        console.log(this.form.getRawValue());
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.message = err.error?.message || 'Erro ao cadastrar';
      }
    });
  }
}