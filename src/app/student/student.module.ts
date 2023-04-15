import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    StudentEditComponent,NavComponent, CoursesListComponent
  ],
  imports: [MaterialModule,
    CommonModule,ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
