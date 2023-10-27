import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-cons',
  templateUrl: './customer-cons.component.html',
  styleUrls: ['./customer-cons.component.css'],
})
export class CustomerConsComponent implements OnInit {
  public loading: boolean = false;
  public formFilter: any = {};
  public customers: any = [];
  public page: number = 1;
  public pageSize: number = 8;
  public totalItens: number = 0;

  constructor(
    private filter: FilterService,
    private req: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  filtering() {
    let ret: any = this.filter.filter(this.customers, {
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

  newCustomer() {
    this.router.navigate(['/home/customers/post', 0]);
  }

  editCustomer(c: any) {
    this.router.navigate(['/home/customers/post/', c.id]);
  }

  deleteCustomer(c: any) {
    if (!window.confirm('Deseja realmente excluir?')) {
      return;
    }
    this.loading = true;
    this.req.delete('customers/' + c.id, c).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.getCustomers();
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  getCustomers() {
    this.loading = true;
    this.req.get('customers', {}).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.customers = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }
}
