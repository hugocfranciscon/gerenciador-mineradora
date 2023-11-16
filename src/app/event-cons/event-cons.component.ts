import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { RequestService } from '../services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-cons',
  templateUrl: './event-cons.component.html',
  styleUrls: ['./event-cons.component.css'],
})
export class EventConsComponent implements OnInit {
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
    this.getEvents();
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

  newEvent() {
    this.router.navigate(['/home/events/post', 0]);
  }

  editEvent(c: any) {
    this.router.navigate(['/home/events/post/', c.id]);
  }

  deleteEvent(c: any) {
    if (!window.confirm('Deseja realmente excluir?')) {
      return;
    }
    this.loading = true;
    this.req.delete('events/' + c.id, c).subscribe(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.getEvents();
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  getEvents() {
    this.loading = true;
    this.req.get('events').then(
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
