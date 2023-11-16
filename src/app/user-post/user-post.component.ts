import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AlertComponent } from '../components/alert/alert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/User';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css'],
})
export class UserPostComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public user!: User;

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = new User();
    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.loading = true;
      this.req.get('users/' + Number(routeParams.get('id'))).then(
        (ret: any) => {
          this.loading = false;
          this.user = ret;
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
    }
  }

  confirmUser() {
    this.loading = true;
    if (this.user?.id != undefined) {
      this.req.put('users/' + this.user.id, this.user).subscribe(
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
    this.req.post('users', this.user).subscribe(
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
