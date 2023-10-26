import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cons',
  templateUrl: './user-cons.component.html',
  styleUrls: ['./user-cons.component.css'],
})
export class UserConsComponent implements OnInit {
  public loading: boolean = false;
  public formFilter: any = {};
  public users: any = [];
  public page: number = 1;
  public pageSize: number = 8;
  public totalItens: number = 0;

  constructor(
    private filter: FilterService,
    private req: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
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
    this.router.navigate(['/home/users/post', 0]);
  }

  editUser(u: any) {
    this.router.navigate(['/home/users/post/', u.id]);
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
