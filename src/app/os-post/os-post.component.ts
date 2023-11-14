import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { NgForm } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Os } from '../models/Os';
import {
  Observable,
  OperatorFunction,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-os-post',
  templateUrl: './os-post.component.html',
  styleUrls: ['./os-post.component.css'],
})
export class OsPostComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public formFilter: any = {};
  public page: number = 1;
  public pageSize: number = 5;
  public totalItens: number = 0;
  public os!: Os;
  public days!: any;
  public customers: any;
  public osNumber: number = 0;

  constructor(
    private filter: FilterService,
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.os = new Os();
    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.osNumber = Number(routeParams.get('id'));
      this.getOs(this.osNumber);
    }
  }

  getOs(id: number) {
    this.loading = true;
    this.req.get('os/' + id).subscribe(
      (ret: any) => {
        this.loading = false;
        this.os = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );

    this.req.get('day?os.id=' + id).subscribe(
      (ret: any) => {
        this.loading = false;
        this.days = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  confirmOs() {
    this.loading = true;
    if (this.os?.id != undefined) {
      this.req.put('os/' + this.os.id, this.os).subscribe(
        (ret: any) => {
          if (ret.status == 'erro') {
            this.loading = false;
            alert(ret.msg);
            return;
          }
          this.alertComponent?.showModal('Sucesso', 'OS salva com sucesso.');
          this.router.navigate(['/home/os']);
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
      return;
    }
    this.req.post('os', this.os).subscribe(
      (ret: any) => {
        if (ret.status == 'erro') {
          this.loading = false;
          alert(ret.msg);
          return;
        }
        this.alertComponent?.showModal('Sucesso', 'OS salva com sucesso.');
        this.router.navigate(['/home/os']);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelOs() {
    this.router.navigate(['/home/os']);
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

  search: OperatorFunction<string, readonly { name: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.customers
              .filter(
                (v: any) =>
                  v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { name: string }) => x.name;

  filtering() {
    this.totalItens = this.days?.length;
    return this.days?.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  async newDay() {
    await window.localStorage.setItem('os', JSON.stringify(this.os));
    this.router.navigate(['/home/os/day', 0]);
  }

  editDay(c: any) {
    this.router.navigate(['/home/os/day/', c.id]);
  }

  deleteDay(c: any) {
    if (!window.confirm('Deseja realmente excluir?')) {
      return;
    }
    this.loading = true;
    this.req.delete('day/' + c.id, c).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.getOs(this.osNumber);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }
}
