import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userLoggedInStatus = new BehaviorSubject<boolean>(false);
  userLoggedInStatus$ = this.userLoggedInStatus.asObservable();

  private apiUrl = `${environment.apiUrl}/registers`; // Usar a URL do environment

  /**
   * Iniciamos no service as regras de negócio
   * O serviço de autenticação precisa de 3 funções
   * Login, Logout e isUserLoggedIn para saber se o usuário esta conectado ou não.
   */

  fakeEmail: string = "teste@email.com"; // utilizado no loginMock
  fakePassword: number = 1234;

  constructor(private _httpClient: HttpClient) { }

  /**
   *  Realizando Login com a API do "Backend" JSON-Server rodando
   *  Testado ok, endpoint no environment http://localhost:3000/
   */
  login(email: string, senha: number): Observable<boolean>{
    return this._httpClient.get<any[]>(
      `${this.apiUrl}?email=${email}&password=${senha}`
    ).pipe(
          map(users => {
            if(users.length > 0){
              localStorage.setItem('accessToken', 'fake-token');
              alert("Login realizado com sucesso!");
              return true;
            }
            alert("Ops! Algo deu errado!!");
            return false;
          }),
        catchError(() => of(false))
      );
  }

  /**
   *  Simulando uma chamada para API com dados mockados
   *  Testado ok
   */
  loginMock(email: string, password: number): Observable<any> {
    this.clearToken();
    console.log("Entrou no service - método login");
    if (email == this.fakeEmail && password == this.fakePassword) {
      localStorage.setItem("accessToken", "my-secret-token-from-server");
      alert("Login realizado com sucesso!");
      this.userLoggedInStatus.next(true);
      return of(new HttpResponse({ status: 200 }));
    } else {
      //return of(new HttpResponse({ status: 401 }));
      alert("Ops! Algo deu errado no login mock!");
      return throwError(() => new Error('Credenciais inválidas'));
    }
  }

  logout(): void {
    console.log("Entrou no service - método logout");
    this.clearToken();
    this.userLoggedInStatus.next(false);
  }

  isUserLoggedIn(): boolean {
    if (localStorage.getItem("accessToken") != null) {
      console.log("Entrou no service - existe token");
      return true;
    }
    console.log("Entrou no service - não existe token!");
    return false;
  }

  getToken(): string | null {
    console.log("Entrou no service - chamou getToken!");
    return this.isUserLoggedIn() ? localStorage.getItem("accessToken") : null;
  }

  private clearToken(){
    localStorage.removeItem("accessToken");
  }

}
