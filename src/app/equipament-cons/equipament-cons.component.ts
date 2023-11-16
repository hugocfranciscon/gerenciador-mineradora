import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipament-cons',
  templateUrl: './equipament-cons.component.html',
  styleUrls: ['./equipament-cons.component.css'],
})
export class EquipamentConsComponent implements OnInit {
  public loading: boolean = false;
  public formFilter: any = {};
  public equipaments: any = [];
  public page: number = 1;
  public pageSize: number = 8;
  public totalItens: number = 0;

  constructor(
    private filter: FilterService,
    private req: RequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEquipaments();
  }

  filtering() {
    let ret: any = this.filter.filter(this.equipaments, {
      description: this.formFilter.description,
      status: this.formFilter.status,
    });
    this.totalItens = ret.length;
    return ret.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  newEquipament() {
    this.router.navigate(['/home/equipaments/post', 0]);
  }

  editEquipament(c: any) {
    this.router.navigate(['/home/equipaments/post/', c.id]);
  }

  deleteEquipament(c: any) {
    if (!window.confirm('Deseja realmente excluir?')) {
      return;
    }
    this.loading = true;
    this.req.delete('equipaments/' + c.id, c).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.getEquipaments();
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  getEquipaments() {
    this.loading = true;
    this.req.get('equipaments').then(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.equipaments = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }
}
