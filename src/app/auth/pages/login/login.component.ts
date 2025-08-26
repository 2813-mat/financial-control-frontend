import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../../../shared/form-error/form-error.component';
import { MatIconModule } from '@angular/material/icon';
import { PasswordRequirements } from '../../../shared/password-requirements/password-requirements.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormErrorComponent,
    MatIconModule,
    PasswordRequirements
]
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  showPassword = false;
PasswordRequirements: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [
        Validators.required,
   ]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, senha } = this.form.value;

    this.authService.login({ email, senha }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        if(err.status == 401){
          this.errorMessage = 'Email ou senha incorretos';
        }else{
          this.errorMessage = 'Erro inesperado. Tente novamente mais tarde';
        }
      }
    });
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
