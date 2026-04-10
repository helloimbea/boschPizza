import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id?: number;
  loading = false;

  form = this.fb.group({
    id: [0],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    endereco: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required, Validators.minLength(3)]],

  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.id = Number(idParam);
      this.loadCliente(this.id);
    }
  }

  loadCliente(id: number): void {
    this.loading = true;
    this.clienteService.getById(id).subscribe({
      next: (cliente)=> {
        this.form.patchValue(cliente);
      },
      complete: () => {
        this.loading = false;
      },

    });
  }

  save(): void {
    //validacao
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    if (this.id) {
      this.clienteService.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/cliente'])
      });
      return;
    }

    this.clienteService.create(payload).subscribe({
      next:() => this.router.navigate(['/cliente']),
      error: (err) => console.error('ERRO CREATE:', err)
      
    });
    
  }

}
