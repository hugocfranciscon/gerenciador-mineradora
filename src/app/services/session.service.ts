import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public users: any;
  public logged: string = 'N';

  constructor(private router: Router, private request: RequestService) {}

  saveSession(key: string, value: any): void {
    window.localStorage.setItem(key, value);
    window.sessionStorage.setItem('logged', 'S');

    this.users = JSON.parse(value);
    this.logged = 'S';
  }

  sessionIsValid(): boolean {
    if (
      window.localStorage.getItem('user') &&
      (this.logged == 'S' || window.sessionStorage.getItem('logged'))
    ) {
      return true;
    } else {
      this.exitSession();
      return false;
    }
  }

  exitSession(): void {
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('logged');
    this.router.navigate(['/']);
  }
}
