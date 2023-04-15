import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    RegisterComponent, LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
