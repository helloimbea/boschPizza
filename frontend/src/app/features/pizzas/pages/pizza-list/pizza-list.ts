import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { PizzaService } from '../../../../core/services/pizza.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pizza } from '../../../../core/models/pizza';

@Component({
  selector: 'app-pizza-list',
  imports: [CommonModule],
  templateUrl: './pizza-list.html',
  styleUrl: './pizza-list.css',
})
export class PizzaList {
  private pizzaService = inject(PizzaService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  pizzas: Pizza[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadData();
  };

  loadData(): void{
    this.pizzaService.getAll().subscribe({
      next: (response) => {
        this.pizzas = response;
      },
      complete: () => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    })
  };

  newPizza(): void {
    this.router.navigate(['/pizzas/novo'])
  };

  editPizza(id?: number): void{
    if(!id) return;
    this.router.navigate(['/pizzas/editar', id]);
  };

  deletePizza(id?: number): void {
    if(!id) return;

    const confirmed = window.confirm('Deseja excluir esta pizza?');

    if(!confirmed) return;

    this.pizzaService.delete(id).subscribe({
      next: () => this.loadData()
    })
  };
}
