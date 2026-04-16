import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PizzaService } from '../../../../core/services/pizza.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pizza-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './pizza-form.html',
  styleUrl: './pizza-form.css',
})
export class PizzaForm {
  private fb = inject(FormBuilder);
  private pizzaService = inject(PizzaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id?: number;
  loading = false;

  form = this.fb.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    isGlutenFree: [false],
    price: [0, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
      this.id = Number(idParam);
      this.loadPizza(this.id);
    }
  }

  loadPizza(id: number): void {
    this.loading = true;
    this.pizzaService.getById(id).subscribe({
      next: (pizza)=> {
        this.form.patchValue(pizza);
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
      this.pizzaService.update(this.id, payload).subscribe({
        next: () => this.router.navigate(['/pizzas'])
      });
      return;
    }

    this.pizzaService.create(payload).subscribe({
      next:() => this.router.navigate(['/pizzas'])
    })
  }

}
