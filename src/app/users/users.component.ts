import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public tabSelected: string = "CON";
  public loading: boolean = false;
  public filter: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  filtering(filter: any) {

  }

}
