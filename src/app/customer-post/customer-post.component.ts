import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { NgForm } from '@angular/forms';
import { Customer } from '../models/Customer';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-post',
  templateUrl: './customer-post.component.html',
  styleUrls: ['./customer-post.component.css'],
})
export class CustomerPostComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public customer!: Customer;

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customer = new Customer();
    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.loading = true;
      this.req.get('customers/' + Number(routeParams.get('id'))).subscribe(
        (ret: any) => {
          this.loading = false;
          this.customer = ret;
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
    }
  }

  confirmCustomer() {
    this.loading = true;
    if (this.customer?.id != undefined) {
      this.req.put('customers/' + this.customer.id, this.customer).subscribe(
        (ret: any) => {
          if (ret.status == 'erro') {
            this.loading = false;
            alert(ret.msg);
            return;
          }
          this.alertComponent?.showModal(
            'Sucesso',
            'Cliente salvo com sucesso.'
          );
          this.router.navigate(['/home/customers']);
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
      return;
    }
    this.req.post('customers', this.customer).subscribe(
      (ret: any) => {
        if (ret.status == 'erro') {
          this.loading = false;
          alert(ret.msg);
          return;
        }
        this.alertComponent?.showModal('Sucesso', 'Cliente salvo com sucesso.');
        this.router.navigate(['/home/customers']);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelCustomer() {
    this.router.navigate(['/home/customers']);
  }
}
