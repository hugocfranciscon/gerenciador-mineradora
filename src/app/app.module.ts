import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './users/users.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomersComponent } from './customers/customers.component';
import { EquipamentComponent } from './equipament/equipament.component';
import { EventComponent } from './event/event.component';
import { OsComponent } from './os/os.component';
import { BtnComponent } from './components/btn/btn.component';
import { AlertComponent } from './components/alert/alert.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserConsComponent } from './user-cons/user-cons.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    CustomersComponent,
    EquipamentComponent,
    EventComponent,
    OsComponent,
    BtnComponent,
    AlertComponent,
    UserPostComponent,
    UserConsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
