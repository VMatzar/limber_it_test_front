import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { NavComponent } from './components/nav/nav.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: CoursesListComponent
      },
      {
        path: 'my-courses',
        component: CoursesListComponent
      },
      {
        path: 'edit',
        component: StudentEditComponent
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
