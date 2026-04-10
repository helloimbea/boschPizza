import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../../core/services/auth';
@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private authService = inject(Auth); 
  menuOpen = false;
  @ViewChild('menu') menu!: ElementRef;
  constructor(private eRef: ElementRef) {}

  toggleMenu():  void {
    this.menuOpen = !this.menuOpen;
  }

@HostListener('document:click', ['$event'])
clickOutside(event: Event) {
  if (
    this.menuOpen &&
    this.menu &&
    !this.menu.nativeElement.contains(event.target)
  ) {
    this.menuOpen = false;
  }
}

  logout(): void {
    this.authService.logout();
  }
}
