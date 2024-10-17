import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { BooksComponent } from './pages/books/books.component';
import { HomeChildrenComponent } from './pages/home/home-children/home-children.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', redirectTo:'/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'home-children', component: HomeChildrenComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'books', component: BooksComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];
