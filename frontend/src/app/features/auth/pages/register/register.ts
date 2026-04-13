import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';
import { RegisterRequest } from '../../../../core/models/register';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  user: RegisterRequest = {
    username: '',
    password: ''
  };

  message = '';

  constructor(private auth: Auth, private router: Router) {}

register() {
  this.auth.register(this.user).subscribe({
    next: () => {
      this.message = 'Conta criada com sucesso!';

      // pequena pausa (opcional, só pra mostrar a mensagem)
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