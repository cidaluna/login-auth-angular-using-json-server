import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

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
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(){
    // Verifica o estado de login
    this.statusUser = this._loginService.isUserLoggedIn();

    // Atualiza o estado do botão Logout sempre que houver uma navegação
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.statusUser = this._loginService.isUserLoggedIn();
      }
    });

    // Acompanha o estado de login
    this._loginService.userLoggedInStatus$.subscribe(
      (status: boolean) => this.statusUser = status
    );
  }

  exit(): void {
    console.log("Entrou no componente App - método exit");
    this._loginService.logout();
    this.statusUser = false;
    this._router.navigate(['/login']); // ok
  }

  navigateToLogin() {
    this._router.navigate(['/login']);
  }

  navigateToHome() {
    this._router.navigate(['/']);
  }

}
