import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  education: string[] = ['Ensino Fundamental', 'Ensino Médio', 'Graduação', 'Pós Graduação', 'Mestrado', 'Doutorado']

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      education: ['', Validators.required],
      gender: ['', Validators.required],
      startDate: ['', Validators.required]
    });
    console.log("Entrou no comp. register - cadastro construtor campos vazios");
  }

  ngOnInit(): void {

  }

  submitRegister(){
    if(this.registerForm.invalid){
      return;
    }else{
      const data = this.registerForm.value;
      this.authService.register(data).subscribe({
        next: (value) => {
          console.log("Entrou no comp. register - método submitRegister", value);
          alert("Cadastro realizado com sucesso!"); // melhorar isso, usar o status code
          this.resetFormLogin();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log("Entrou no comp. register - erro no método submitRegister", err);
          this.router.navigate(['/register']);
          this.resetFormLogin();
        }
      });
    }


  }

  resetFormLogin(){
    this.registerForm.reset();
  }

}
