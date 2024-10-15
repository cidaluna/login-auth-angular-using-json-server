import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterOutlet, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  statusUser: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(){
    // Verifica o estado de login
    this.statusUser = this.authService.isUserLoggedIn();

    // Atualiza o estado do botão Logout sempre que houver uma navegação
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.statusUser = this.authService.isUserLoggedIn();
      }
    });

    // Acompanha o estado de login
    this.authService.userLoggedInStatus$.subscribe(
      (status: boolean) => this.statusUser = status
    );
  }

  exit(): void {
    console.log("Entrou no componente App - método exit");
    this.authService.logout();
    this.statusUser = false;
    this.router.navigate(['/login']); // ok
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

}
