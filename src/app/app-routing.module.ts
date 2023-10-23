import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { EquipamentComponent } from './equipament/equipament.component';
import { EventComponent } from './event/event.component';
import { OsComponent } from './os/os.component';

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
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'equipaments',
        component: EquipamentComponent,
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
