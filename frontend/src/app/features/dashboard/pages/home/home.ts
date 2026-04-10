import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private router = inject(Router);

  goToPizzas() {
    this.router.navigate(['/pizzas']);
  }

  goToClientes() {
    this.router.navigate(['/cliente']);
  }
}