import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AlertComponent } from '../components/alert/alert.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  public loading: boolean = false;
  public form: any = {
    name: '',
    email: '',
    fone: '',
    status: '',
    login: '',
    password: '',
    type: '',
  };

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;

    if (Number(routeParams.get('id')) > 0) {
      this.loading = true;
      this.req.get('users/' + Number(routeParams.get('id'))).subscribe(
        (ret: any) => {
          this.loading = false;
          this.form = ret;
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
    }
  }

  formValid() {
    if (
      !this.form.name ||
      !this.form.email ||
      !this.form.fone ||
      !this.form.status ||
      !this.form.login ||
      !this.form.password ||
      !this.form.type
    ) {
      return false;
    }
    return true;
  }

  confirmUser() {
    this.loading = true;
    if (this.form.hasOwnProperty('id')) {
      this.req.put('users/' + this.form.id, this.form).subscribe(
        (ret: any) => {
          if (ret.status == 'erro') {
            this.loading = false;
            alert(ret.msg);
            return;
          }
          this.alertComponent?.showModal(
            'Sucesso',
            'Usuário salvo com sucesso.'
          );
          this.router.navigate(['/home/users']);
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
      return;
    }
    this.req.post('users', this.form).subscribe(
      (ret: any) => {
        if (ret.status == 'erro') {
          this.loading = false;
          alert(ret.msg);
          return;
        }
        this.alertComponent?.showModal('Sucesso', 'Usuário salvo com sucesso.');
        this.router.navigate(['/home/users']);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelUser() {
    this.router.navigate(['/home/users']);
  }
}
