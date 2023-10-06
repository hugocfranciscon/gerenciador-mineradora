import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-new',
  templateUrl: './btn-new.component.html',
  styleUrls: ['./btn-new.component.css'],
})
export class BtnNewComponent implements OnInit {
  @Output() functionBtn: EventEmitter<any> = new EventEmitter();

  @Input() type: string = '';
  @Input() class: string = '';
  @Input() toolTip: string = '';
  @Input() label: string = '';
  @Input() disabled: string = '';

  function() {
    this.functionBtn.emit();
  }

  constructor() {}

  ngOnInit(): void {}
}
