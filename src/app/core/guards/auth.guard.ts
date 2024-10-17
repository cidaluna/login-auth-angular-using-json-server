import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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
    private _loginService: LoginService,  // para gerenciar o estado de autenticação do usuário
    private _router: Router
  ) {}

  /**
   *  Sempre que uma rota protegida tenta ser acessada,
   *  o método canActivate é chamado e nele verificamos se
   *  o usuário não estiver logado redireciona para a página login,
   *  mas se o usuário estiver logado o acesso à rota é concedido.
   */
  canActivate(){
    const isAuthenticated = this._loginService.isUserLoggedIn();
    if (!isAuthenticated) {
      console.log("Guard canActivate - Usuario não autenticado: ",isAuthenticated);
      this._router.navigate(['/login']);
      return false;
    }
    console.log("Guard canActivate - Usuario autenticado: ",isAuthenticated);
    return true;
  }

}
