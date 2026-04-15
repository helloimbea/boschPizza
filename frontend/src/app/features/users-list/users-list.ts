import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { CommonModule } from '@angular/common';
import { User } from '../../core/services/user';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {

  private cdr = inject(ChangeDetectorRef)
  users: any[] = [];
  loading = true;
  error = '';

  constructor(private user: User, private auth: Auth) {}

  ngOnInit() {
    this.user.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Erro ao buscar usuários';
        this.loading = false;
        this.cdr.markForCheck();

      }
    });
  }



deleteUser(id: number) {
  const currentUserId = this.auth.getUserId();

  // 🧠 se for o próprio usuário
  if (id === currentUserId) {
    const confirmDelete = confirm(
      '⚠️ Você está prestes a deletar sua própria conta.\n\nVocê será deslogado.\n\nDeseja continuar?'
    );
    this.cdr.markForCheck();

    if (!confirmDelete) return;
  } else {
    const confirmDelete = confirm('Tem certeza que deseja deletar este usuário?');
    if (!confirmDelete) return;
  }

  const password = prompt('Digite a senha para confirmar:');
  if (!password) return;

  this.user.deleteUserWithPassword({ id, password }).subscribe({
    next: () => {

      // 🔥 SE DELETOU A SI MESMO → LOGOUT
      if (id === currentUserId) {
        this.auth.logout();
        return;
      }

      // remove da lista
      this.users = this.users.filter(u => u.id !== id);
      this.cdr.markForCheck();
    },
    error: (err) => {
      alert(err.error?.message || 'Erro ao deletar');
    }
  });
}


}