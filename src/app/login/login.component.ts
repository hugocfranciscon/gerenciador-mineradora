import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';
import { SessionService } from '../services/session.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;

  public userForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private request: RequestService,
    private router: Router,
    private formBuilder: FormBuilder,
    private session: SessionService,
    public utils: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    let logged = this.session.sessionIsValid();
    if (logged) {
      this.router.navigate(['/home']);
    }
  }

  login(): void {
    if (this.userForm.invalid) {
      this.utils.formValid(this.userForm);
      return;
    }

    let body = {
      user: this.userForm.value.user,
      pass: this.userForm.value.password,
    };

    this.loading = true;
    this.request.get('logar', body).subscribe(
      (ret: any) => {
        this.loading = false;

        if (ret.status == 'ok') {
          window.localStorage.setItem('token', ret.token);
          this.session.saveSession('user', JSON.stringify(ret.user));
          this.router.navigate(['/home']);
        } else if (ret.status == 'error') {
          alert(ret.msg);
        }
      },
      (err: any) => {
        this.loading = false;
        alert('Usuário ou senha incorretos.');
      }
    );
  }
}
