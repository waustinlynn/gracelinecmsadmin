import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthenticationCodeService } from '../../api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatLabel,
    MatButton,
    MatFormField,
    MatCardTitle,
    MatCard,
    MatCardContent,
    MatInput,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  authenticationCodeService: AuthenticationCodeService = inject(AuthenticationCodeService);

  async onLogin(): Promise<void> {
    try {
      let response = await firstValueFrom(this.authenticationCodeService.authenticationCodePost({ emailAddress: this.email }));
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }

  }
}