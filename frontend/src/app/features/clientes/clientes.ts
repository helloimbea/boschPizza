import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ClienteService } from '../../core/services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../core/models/cliente';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  clientes: Cliente[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadData();
  };

  loadData(): void{
    this.clienteService.getAll().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      complete: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    })
  };

  newCliente(): void {
    this.router.navigate(['/cliente/novo'])
  };

  editCliente(id?: number): void{
    if(!id) return;
    this.router.navigate(['/cliente/editar', id]);
  };

  deleteCliente(id?: number): void {
    if(!id) return;

    const confirmed = window.confirm('Deseja excluir este cliente?');

    if(!confirmed) return;

    this.clienteService.delete(id).subscribe({
      next: () => this.loadData()
    })
  };
}
