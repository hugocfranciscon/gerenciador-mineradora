import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { EquipamentComponent } from './equipament/equipament.component';
import { EventComponent } from './event/event.component';
import { OsComponent } from './os/os.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserConsComponent } from './user-cons/user-cons.component';
import { CustomerConsComponent } from './customer-cons/customer-cons.component';
import { CustomerPostComponent } from './customer-post/customer-post.component';
import { EquipamentConsComponent } from './equipament-cons/equipament-cons.component';
import { EquipamentPostComponent } from './equipament-post/equipament-post.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            component: UserConsComponent,
          },
          {
            path: 'post/:id',
            component: UserPostComponent,
          },
        ],
      },
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          {
            path: '',
            component: CustomerConsComponent,
          },
          {
            path: 'post/:id',
            component: CustomerPostComponent,
          },
        ],
      },
      {
        path: 'equipaments',
        component: EquipamentComponent,
        children: [
          {
            path: '',
            component: EquipamentConsComponent,
          },
          {
            path: 'post/:id',
            component: EquipamentPostComponent,
          },
        ],
      },
      {
        path: 'events',
        component: EventComponent,
      },
      {
        path: 'os',
        component: OsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
