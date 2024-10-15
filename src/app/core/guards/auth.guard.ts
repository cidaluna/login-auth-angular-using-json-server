import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *  Esta classe Auth Guard é uma guarda de rotas, ou seja, ela
   *  protege determinada(s) rota(s) de serem acessadas por usuários
   *  não autenticados.
   */

  constructor(
    private authService: AuthService,  // para gerenciar o estado de autenticação do usuário
    private router: Router
  ) {}

  /**
   *  Sempre que uma rota protegida tenta ser acessada,
   *  o método canActivate é chamado e nele verificamos se
   *  o usuário não estiver logado redireciona para a página login,
   *  mas se o usuário estiver logado o acesso à rota é concedido.
   */
  canActivate(){
    const isAuthenticated = this.authService.isUserLoggedIn();
    if (!isAuthenticated) {
      console.log("Guard canActivate - Usuario não autenticado: ",isAuthenticated);
      this.router.navigate(['/login']);
      return false;
    }
    console.log("Guard canActivate - Usuario autenticado: ",isAuthenticated);
    return true;
  }

}
