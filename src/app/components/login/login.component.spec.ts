import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthenticationCodeService } from '../../api';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { getElementByTestId } from '../../../testing/helpers';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { TokenService } from '../../services/token.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeToken: string = "faketoken";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        provideRouter(routes),
        AuthenticationCodeService
      ]
    })
      .compileComponents();

    const authenticationCodeService = TestBed.inject(AuthenticationCodeService);
    spyOn(authenticationCodeService, 'authenticationCodePost').and.returnValue(of(new HttpResponse({ status: 200, body: {} })));
    spyOn(authenticationCodeService, 'authenticationCodeValidatePost').and.returnValue(of(new HttpResponse({
      status: 200, body: fakeToken
    })));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login button', () => {
    const loginButton = getElementByTestId(fixture, 'login-button');
    expect(loginButton).toBeTruthy();
    const verifyButton = getElementByTestId(fixture, 'verify-button');
    expect(verifyButton).toBeFalsy();
  });

  it('should handle login flow', async () => {
    //submit login
    const loginButton = getElementByTestId(fixture, 'login-button');
    const loginInput = getElementByTestId(fixture, 'login-input') as HTMLInputElement;
    loginInput.value = 'test@email.com';
    loginInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    loginButton?.click();
    await fixture.whenStable();

    //submit verify
    const verifyButton = getElementByTestId(fixture, 'verify-button');
    expect(verifyButton).toBeTruthy();
    expect(getElementByTestId(fixture, 'login-button')).toBeFalsy();
    const verifyInput = getElementByTestId(fixture, 'verify-input') as HTMLInputElement;
    verifyInput.value = '123456';
    verifyInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    verifyButton?.click();
    await fixture.whenStable();

    //assert router navigation
    expect(TestBed.inject(Router).url).toBe('/home');

    const tokenService = TestBed.inject(TokenService);
    expect(tokenService.getAuthToken()).toBe(fakeToken);
  });
});
