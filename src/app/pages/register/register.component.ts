import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from '../../core/services/register-user.service';
import { Messages } from '../../shared/messages/messages';

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

  public messages = Messages; // Torna 'messages' acessível no template

  constructor(private _fb: FormBuilder,
    private _registerUserService: RegisterUserService,
    private _router: Router
    ){
    this.registerForm = this._fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"),
        ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6),
        Validators.pattern("^(?=.*[0-9])(?=.*[!@#]).{4,6}$"),
      ]],
      education: ['', Validators.required],
      gender: ['', Validators.required],
      startDate: ['', [
        Validators.required,
        this.dateInFutureValidator
      ]]
    });
    console.log("Entrou no comp. register - cadastro construtor campos vazios");
  }

  ngOnInit(): void {

  }

  get isGenderRequired() {
    const genderControl = this.registerForm.get('gender');
    return genderControl?.errors?.['required'] && genderControl.touched;
  }

  // Valida se a data está no futuro
  dateInFutureValidator(control: FormControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignorar a hora na comparação

    if (!control.value) {
      return null; // Se não houver valor, não retorna erro
    }

    return selectedDate >= today ? null : { pastDate: true }; // Retorna null se válido, caso contrário retorna erro
  }

  // Verifica se a data é inválida
  // Verifica se o campo de data é inválido
  get startDateErrors() {
    const startDateControl = this.registerForm.get('startDate');
    if (startDateControl?.errors?.['required'] && startDateControl.touched) {
      return { required: true };
    } else if (startDateControl?.errors?.['pastDate']) {
      return { pastDate: true };
    }
    return null; // Nenhum erro
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
