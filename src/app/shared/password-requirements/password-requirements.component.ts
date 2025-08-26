import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-requirements',
  templateUrl: './password-requirements.component.html',
  styleUrls: ['./password-requirements.component.scss'],
  imports: [CommonModule]
})
export class PasswordRequirements implements OnChanges {
  @Input() password = '';

  passwordRequirements = [
    { key: 'minLength', text: 'Mínimo de 8 caracteres', valid: false },
    { key: 'upperCase', text: 'Pelo menos 1 letra maiúscula', valid: false },
    { key: 'lowerCase', text: 'Pelo menos 1 letra minúscula', valid: false },
    { key: 'number', text: 'Pelo menos 1 número', valid: false },
    { key: 'specialChar', text: 'Pelo menos 1 caractere especial (!@#$%)', valid: false }
  ];

 ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) {
      this.validatePassword(changes['password'].currentValue);
    }
  }

  validatePassword(password: string) {
    this.passwordRequirements = this.passwordRequirements.map(req => {
      switch (req.key) {
        case 'minLength':
          req.valid = password.length >= 8;
          break;
        case 'upperCase':
          req.valid = /[A-Z]/.test(password);
          break;
        case 'lowerCase':
          req.valid = /[a-z]/.test(password);
          break;
        case 'number':
          req.valid = /[0-9]/.test(password);
          break;
        case 'specialChar':
          req.valid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          break;
      }
      return req;
    });
  }
}
