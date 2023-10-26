import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef | undefined;
  public message: string = '';
  public title: string = '';

  constructor(public modalService: NgbModal) {}

  exit() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {}

  showModal(title: string, msg: string) {
    this.title = title;
    this.message = msg;
    this.modalService.open(this.modal);
  }
}
