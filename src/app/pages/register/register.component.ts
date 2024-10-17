import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from '../../core/services/register-user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  isSubmitting: boolean = false; // Variável para controlar o estado do botão

  education: string[] = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Graduação',
    'Pós Graduação',
    'Mestrado',
    'Doutorado'
  ];

  constructor(private _fb: FormBuilder,
    private _registerUserService: RegisterUserService,
    private _router: Router
    ){
    this.registerForm = this._fb.group({
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
      this.isSubmitting = true;
      this._registerUserService.addUser(data).subscribe({
        next: (value: any) => {
          console.log("Entrou no comp. register - método submitRegister", value);
          alert("Cadastro realizado com sucesso!"); // melhorar isso, usar o status code
          this.resetFormLogin();
          this._router.navigate(['/login']);
          this.isSubmitting = false;
        },
        error: (err: any) => {
          console.log("Entrou no comp. register - erro no método submitRegister", err);
          this._router.navigate(['/register']);
          this.resetFormLogin();
          this.isSubmitting = false;
        }
      });
    }


  }

  resetFormLogin(){
    this.registerForm.reset();
  }

}
