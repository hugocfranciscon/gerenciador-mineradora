import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-cons',
  templateUrl: './os-cons.component.html',
  styleUrls: ['./os-cons.component.css']
})
export class OsConsComponent implements OnInit {

  public loading: boolean = false;
  public formFilter: any = {};
  public os: any = [];
  public page: number = 1;
  public pageSize: number = 8;
  public totalItens: number = 0;

  constructor(
    private filter: FilterService,
    private req: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOs();
  }

  filtering() {
    let ret: any = this.filter.filter(this.os, {
      name: this.formFilter.name,
      date: this.formFilter.date,
    });
    this.totalItens = ret.length;
    return ret.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  newOs() {
    this.router.navigate(['/home/os/post', 0]);
  }

  editOs(c: any) {
    this.router.navigate(['/home/os/post/', c.id]);
  }

  deleteOs(c: any) {
    if (!window.confirm('Deseja realmente excluir?')) {
      return;
    }
    this.loading = true;
    this.req.delete('os/' + c.id, c).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.getOs();
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  getOs() {
    this.loading = true;
    this.req.get('os', {}).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.os = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }
}
