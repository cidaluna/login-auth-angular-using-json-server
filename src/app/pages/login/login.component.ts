import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isChecked: boolean = false;

  constructor(private _fb: FormBuilder,
              private _loginService: LoginService,
              private _router: Router
  ){
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    console.log("Entrou no comp. login - construtor campos vazios");
  }

  ngOnInit(): void {
    this.loadEmailFromLocalStorage();
  }

  loadEmailFromLocalStorage(){
    const savedEmail = localStorage.getItem('email');
    if(savedEmail){
      this.loginForm.patchValue({ email: savedEmail });
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
  }

  onChangeCheckbox(event: Event){
    const checkbox = event.target as HTMLInputElement;
    this.isChecked = checkbox.checked;
    console.log(`Checkbox está ${this.isChecked ? 'ativo' : 'desativo'}`);

    if(this.isChecked){
      if(this.isValidEmail()){
      localStorage.setItem('email', this.loginForm.get('email')?.value);
      } else {
        this.isChecked = false;
        localStorage.removeItem('email');
      }
    } else {
      localStorage.removeItem('email');
    }
  }

  isValidEmail(): boolean{
    const email = this.loginForm.get('email');
    return email?.valid || false;
  }

  submitLogin(){
    event?.preventDefault();
    const data = this.loginForm.value;
    if(data.email && data.password){
      //this._authService.loginMock(data.email, data.password).subscribe({
      this._loginService.login(data.email, data.password).subscribe({
        next: (value) => {
          console.log("Entrou no comp. login - método submitLogin", value);
          this._router.navigate(['/books']);
        },
        error: (err) => {
          console.log("Entrou no comp. login - erro no método submitLogin", err);
          this._router.navigate(['/login']);
          this.resetFormLogin();
        }
      });
    }
  }

  resetFormLogin(){
    this.loginForm.reset();
  }

  navigateToRegister(){
    this._router.navigate(['/register']);
  }

}
