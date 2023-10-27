import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css'],
})
export class BtnComponent implements OnInit {
  @Input() type: string = '';
  @Input() classes: string = '';
  @Input() toolTip: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
