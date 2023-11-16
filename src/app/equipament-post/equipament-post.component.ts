import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';
import { NgForm } from '@angular/forms';
import { Equipament } from '../models/Equipament';
import { RequestService } from '../services/request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-equipament-post',
  templateUrl: './equipament-post.component.html',
  styleUrls: ['./equipament-post.component.css'],
})
export class EquipamentPostComponent implements OnInit {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  @ViewChild('form') form!: NgForm;

  public loading: boolean = false;
  public equipament!: Equipament;

  constructor(
    private req: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.equipament = new Equipament();
    const routeParams = this.route.snapshot.paramMap;
    if (Number(routeParams.get('id')) > 0) {
      this.loading = true;
      this.req.get('equipaments/' + Number(routeParams.get('id'))).then(
        (ret: any) => {
          this.loading = false;
          this.equipament = ret;
        },
        (err: any) => {
          this.loading = false;
          alert('ERRO ' + err);
        }
      );
    }
  }

  confirmEquipament() {
    this.loading = true;
    if (this.equipament?.id != undefined) {
      this.req
        .put('equipaments/' + this.equipament.id, this.equipament)
        .subscribe(
          (ret: any) => {
            if (ret.status == 'erro') {
              this.loading = false;
              alert(ret.msg);
              return;
            }
            this.alertComponent?.showModal(
              'Sucesso',
              'Equipamento salvo com sucesso.'
            );
            this.router.navigate(['/home/equipaments']);
          },
          (err: any) => {
            this.loading = false;
            alert('ERRO ' + err);
          }
        );
      return;
    }
    this.req.post('equipaments', this.equipament).subscribe(
      (ret: any) => {
        if (ret.status == 'erro') {
          this.loading = false;
          alert(ret.msg);
          return;
        }
        this.alertComponent?.showModal(
          'Sucesso',
          'Equipamento salvo com sucesso.'
        );
        this.router.navigate(['/home/equipaments']);
      },
      (err: any) => {
        this.loading = false;
        alert('ERRO ' + err);
      }
    );
  }

  cancelEquipament() {
    this.router.navigate(['/home/equipaments']);
  }
}
