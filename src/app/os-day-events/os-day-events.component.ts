import { Component, OnInit, ViewChild } from '@angular/core';
import { EventDay } from '../models/EventDay';
import { NgForm } from '@angular/forms';
import { AlertComponent } from '../components/alert/alert.component';
import { Day } from '../models/Day';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, OperatorFunction, debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-os-day-events',
  templateUrl: './os-day-events.component.html',
  styleUrls: ['./os-day-events.component.css'],
})
export class OsDayEventsComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public event!: EventDay;
  public day?: Day;
  public users: any;
  public events: any;
  public equipaments: any;
  public dayEventNumber?: number;

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.event = new EventDay();
    let o = window.localStorage.getItem('day');
    if (o) {
      this.day = JSON.parse(o);
      this.event.day = this.day;
    }

    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.dayEventNumber = Number(routeParams.get('id'));
      this.getEvent(this.dayEventNumber);
    }

    this.req.get('users').then(
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
    this.req.get('events').then(
      (ret: any) => {
        this.loading = false;
        if (ret.status == 'erro') {
          alert(ret.msg);
          return;
        }
        this.events = ret;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
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

  getEvent(id: number) {
    this.loading = true;
    this.req.get('eventsDay/' + id).then(
      (ret: any) => {
        this.loading = false;
        this.event = ret;
        this.day = this.event.day;
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  confirmEvent() {
    if (this.event.finishHour && this.event.startHour) {
      let hI = new Date(new Date().toDateString() + ' ' + this.event.startHour);
      let hF = new Date(
        new Date().toDateString() + ' ' + this.event.finishHour
      );
      if (hF < hI) {
        this.alertComponent?.showModal(
          'Erro',
          'Hora final não pode ser maior que hora inicial.'
        );
        return;
      }
    }

    this.loading = true;
    if (this.event?.id != undefined) {
      this.req.put('eventsDay/' + this.event.id, this.event).subscribe(
        (ret: any) => {
          if (ret.status == 'erro') {
            this.loading = false;
            alert(ret.msg);
            return;
          }
          this.alertComponent?.showModal(
            'Sucesso',
            'Evento salvo com sucesso.'
          );
          this.router.navigate(['/home/os/day', this.day?.id]);
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
      return;
    }
    this.req.post('eventsDay', this.event).subscribe(
      (ret: any) => {
        if (ret.status == 'erro') {
          this.loading = false;
          alert(ret.msg);
          return;
        }
        this.alertComponent?.showModal('Sucesso', 'Evento salvo com sucesso.');
        this.router.navigate(['/home/os/day', this.day?.id]);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelEvent() {
    this.router.navigate(['/home/os/day', this.day?.id]);
  }

  searchUsers: OperatorFunction<string, readonly { name: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.users
              .filter(
                (v: any) =>
                  v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatterUsers = (x: { name: string }) => x.name;

  searchEvents: OperatorFunction<string, readonly { name: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.events
              .filter(
                (v: any) =>
                  v.description.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatterEvents = (x: { description: string }) => x.description;

  searchEquipaments: OperatorFunction<string, readonly { name: any }[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.equipaments
              .filter(
                (v: any) =>
                  v.description.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatterEquipaments = (x: { description: string }) => x.description;
}
