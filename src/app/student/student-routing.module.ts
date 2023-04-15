import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { NavComponent } from './components/nav/nav.component';
import { StudentCoursesListComponent } from './components/student-courses-list/student-courses-list.component';
import { AllCoursesListComponent } from './components/all-courses-list/all-courses-list.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: StudentCoursesListComponent
      },
      {
        path: 'my-courses',
        component: StudentCoursesListComponent
      },
      {
        path: 'edit',
        component: StudentEditComponent
      },
      {
        path: 'courses',
        component: AllCoursesListComponent
      },
      {
        path: 'courses-edit/:id',
        component: CourseEditComponent
      },
      {
        path: 'create-course',
        component: CreateCourseComponent
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
