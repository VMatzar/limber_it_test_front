import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AllCoursesListComponent } from './components/all-courses-list/all-courses-list.component';
import { StudentCoursesListComponent } from './components/student-courses-list/student-courses-list.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';

@NgModule({
  declarations: [
    StudentEditComponent, NavComponent, StudentCoursesListComponent, AllCoursesListComponent, CourseEditComponent, CreateCourseComponent
  ],
  imports: [MaterialModule,
    CommonModule, ReactiveFormsModule,
    StudentRoutingModule,
    LayoutModule,
  ]
})
export class StudentModule { }
