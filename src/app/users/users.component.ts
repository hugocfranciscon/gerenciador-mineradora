import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public tabSelected: string = 'CON';
  public loading: boolean = false;
  public formFilter: any = {};
  public form: any = {
    name: '',
    email: '',
    fone: '',
    status: '',
    login: '',
    password: '',
    type: '',
  };
  public users: any = [];
  public page: number = 1;
  public pageSize: number = 8;
  public totalItens: number = 0;

  constructor(private filter: FilterService, private req: RequestService) {}

  ngOnInit(): void {
    this.getUsers()
  }

  filtering() {
    let ret: any = this.filter.filter(this.users, {
      name: this.formFilter.name,
      email: this.formFilter.email,
      fone: this.formFilter.fone,
      status: this.formFilter.status,
    });
    this.totalItens = ret.length;
    return ret.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  newUser() {
    this.form = {};
    this.tabSelected = 'CAD';
  }

  confirmUser() {
    this.loading = true;
    if (this.form.hasOwnProperty('id')) {
      this.req.put('users/'+this.form.id, this.form).subscribe(
        (ret: any) => {
          if (ret.status == 'erro') {
            this.loading = false;
            alert(ret.msg);
            return;
          }
          alert('Usuário salvo com sucesso');
          this.tabSelected = 'CON';
          this.getUsers();
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
        alert('Usuário salvo com sucesso');
        this.tabSelected = 'CON';
        this.getUsers();
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );

  }

  cancelUser() {
    this.form = {};
    this.tabSelected = 'CON';
  }

  editUser(u: any) {
    this.form = JSON.parse(JSON.stringify(u));
    this.tabSelected = 'CAD';
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

  getUsers() {
    this.loading = true;
    this.req.get('users', {}).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {          
          alert(ret.msg);
          return;
        }
        this.users = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }
}
