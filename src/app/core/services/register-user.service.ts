import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  private apiUrlRegister = `${environment.apiUrl}/registers`; // Usar a URL do environment

  constructor(private _httpClient: HttpClient) { }

  // Método para verificar se o usuário já existe com email
  checkUserExists(email: string): Observable<boolean> {
    return this._httpClient.get<IUser[]>(`${this.apiUrlRegister}?email=${email}`)
      .pipe(
        map(users => users.length > 0) // Retorna true se já existe um usuário
      );
  }

  addUser(data: IUser): Observable<IUser>{
    console.log("Entrou no service - método addUser");
    return this._httpClient.post<IUser>(this.apiUrlRegister, data);
  }

  updateUser(id: string, data: IUser): Observable<IUser>{
    console.log("Entrou no service - método updateUser");
    return this._httpClient.put<IUser>(`${this.apiUrlRegister}/${id}`, data);
  }

  getUserList(): Observable<IUser>{
    console.log("Entrou no service - método getUserList");
    return this._httpClient.get<IUser>(this.apiUrlRegister);
  }

  deleteUser(id: string): Observable<IUser>{
    console.log("Entrou no service - método deleteUser");
    return this._httpClient.delete<IUser>(`${this.apiUrlRegister}/${id}`);
  }

}
