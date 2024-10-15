import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: [null, [Validators.required, Validators.minLength(4)]]
    });
    console.log("Entrou no comp. login - construtor campos vazios");
  }

  ngOnInit(): void {

  }

  submitLogin(){
    event?.preventDefault();
    const data = this.loginForm.value;
    if(data.email && data.password){
      this.authService.login(data.email, data.password).subscribe({
        next: (value) => {
          console.log("Entrou no comp. login - método submitLogin", value);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.log("Entrou no comp. login - erro no método submitLogin", err);
          this.router.navigate(['/login']);
          this.resetFormLogin();
        }
      });
    }
  }

  resetFormLogin(){
    this.loginForm.reset();
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
