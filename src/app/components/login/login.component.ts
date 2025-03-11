import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthenticationCodeService } from '../../api';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

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
  code: string = '';
  private authenticationCodeService: AuthenticationCodeService = inject(AuthenticationCodeService);
  private tokenService: TokenService = inject(TokenService);
  private router: Router = inject(Router);
  enterEmail = signal(true);
  enterCode = signal(false);

  async onLogin(): Promise<void> {
    try {
      let response = await firstValueFrom(this.authenticationCodeService.authenticationCodePost({ emailAddress: this.email }));
      this.enterEmail.set(false);
      this.enterCode.set(true);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async onVerify(): Promise<void> {
    try {
      let response = await firstValueFrom(this.authenticationCodeService.authenticationCodeValidatePost({ emailAddress: this.email, authCode: this.code }, 'response'));
      console.log('Response:', response);
      if (response.body === null) {
        throw new Error('Invalid code');
      }
      this.tokenService.setAuthToken(response.body);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}