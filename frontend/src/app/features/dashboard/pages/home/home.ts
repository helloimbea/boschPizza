import { Component, inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { Chart } from 'chart.js/auto';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private router = inject(Router);
  authService = inject(Auth)
private cdr = inject(ChangeDetectorRef);
  clientesPorMes: any[] = [];
  totalPizzas: number = 0;
  totalClientes: number = 0;
  ultimaPizza: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboard();
      this.cdr.markForCheck();

  }

  loadDashboard() {
    this.dashboardService.getDashboard().subscribe(data => {
      this.totalPizzas = data.totalPizzas;
      this.totalClientes = data.totalClientes;
      this.ultimaPizza = data.ultimaPizza;

      this.clientesPorMes = data.clientesPorMes;

      setTimeout(() => {
        this.renderChart();
        this.cdr.markForCheck();
      }, 0);
    });
  }

  goToPizzas() {
    this.router.navigate(['/pizzas']);
  }

  goToClientes() {
    this.router.navigate(['/cliente']);
  }

  renderChart() {

    if (!this.clientesPorMes.length) return;

    const meses = Array(12).fill(0);

    this.clientesPorMes.forEach(c => {
      meses[c.mes - 1] = c.quantidade;
    });

    new Chart('clientesChart', {
      type: 'bar',
      data: {
        labels: [
          'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ],
        datasets: [{
          label: 'Clientes',
          data: meses
        }]
      }
    });
      this.cdr.markForCheck();

  }
}