import { Component, OnInit, ViewChild } from '@angular/core';
import { Day } from '../models/Day';
import { AlertComponent } from '../components/alert/alert.component';
import { NgForm } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Os } from '../models/Os';

@Component({
  selector: 'app-os-day',
  templateUrl: './os-day.component.html',
  styleUrls: ['./os-day.component.css'],
})
export class OsDayComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public day!: Day;
  public os!: Os | undefined;
  public events: any;
  public formFilter: any = {};
  public page: number = 1;
  public pageSize: number = 5;
  public totalItens: number = 0;
  public dayNumber: number = 0;

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let o = window.localStorage.getItem('os');
    if (o) {
      this.os = JSON.parse(o);
      this.day.os = this.os;
    }
    this.day = new Day();
    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.dayNumber = Number(routeParams.get('id'));
      this.getDay(this.dayNumber);
    }
  }

  confirmDay() {
    this.loading = true;
    if (this.day?.id != undefined) {
      this.req.put('day/' + this.day.id, this.day).subscribe(
        (ret: any) => {
          if (ret.status == 'erro') {
            this.loading = false;
            alert(ret.msg);
            return;
          }
          this.alertComponent?.showModal('Sucesso', 'OS salva com sucesso.');
          this.router.navigate(['/home/os/post/', this.os?.id]);
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
      return;
    }
    this.req.post('day', this.day).subscribe(
      (ret: any) => {
        if (ret.status == 'erro') {
          this.loading = false;
          alert(ret.msg);
          return;
        }
        this.alertComponent?.showModal('Sucesso', 'OS salva com sucesso.');
        this.router.navigate(['/home/os/post', this.os?.id]);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelDay() {
    this.router.navigate(['/home/os/post/', this.os?.id]);
  }

  getDay(id: number) {
    this.loading = true;
    this.req.get('day/' + id).then(
      (ret: any) => {
        this.loading = false;
        this.day = ret;
        this.os = this.day.os;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );

    this.req.get('eventsDay?day.id=' + id).then(
      (ret: any) => {
        this.loading = false;
        this.events = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  filtering() {
    this.totalItens = this.events?.length;
    return this.events?.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  newEvent() {
    window.localStorage.setItem('day', JSON.stringify(this.day));
    this.router.navigate(['/home/os/event', 0]);
  }

  editEvent(c: any) {
    this.router.navigate(['/home/os/event/', c.id]);
  }

  deleteEvent(c: any) {
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
        this.getDay(this.dayNumber);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }
}
