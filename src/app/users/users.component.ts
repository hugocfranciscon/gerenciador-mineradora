import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';

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

  constructor(private filter: FilterService) {}

  ngOnInit(): void {}

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

  confirmUser() {}

  cancelUser() {
    this.form = {};
    this.tabSelected = 'CON';
  }

  alterUser(u: any) {}

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
}
