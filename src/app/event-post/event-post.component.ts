import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { NgForm } from '@angular/forms';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../models/Event';

@Component({
  selector: 'app-event-post',
  templateUrl: './event-post.component.html',
  styleUrls: ['./event-post.component.css']
})
export class EventPostComponent implements OnInit {

  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public event!: Event;

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.event = new Event();
    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.loading = true;
      this.req.get('events/' + Number(routeParams.get('id'))).subscribe(
        (ret: any) => {
          this.loading = false;
          this.event = ret;
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
    }
  }

  confirmEvent() {
    this.loading = true;
    if (this.event?.id != undefined) {
      this.req
        .put('events/' + this.event.id, this.event)
        .subscribe(
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
            this.router.navigate(['/home/events']);
          },
          (err: any) => {
            this.loading = false;
            alert('ERRO ' + err);
          }
        );
      return;
    }
    this.req.post('events', this.event).subscribe(
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
        this.router.navigate(['/home/events']);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelEvent() {
    this.router.navigate(['/home/events']);
  }
}