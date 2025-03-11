import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authToken: string = '';
  constructor() { }

  getAuthToken(): string {
    return this.authToken;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }


}
