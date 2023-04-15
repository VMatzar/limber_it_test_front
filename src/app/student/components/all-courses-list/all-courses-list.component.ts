import { Component, OnInit } from '@angular/core';
import { Course } from '@core/models/course.model';
import { SerCoursesService } from '@core/services/ser-courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-all-courses-list',
  templateUrl: './all-courses-list.component.html',
  styleUrls: ['./all-courses-list.component.scss']
})
export class AllCoursesListComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['course_id', 'name', 'credits', 'teacher', 'actions'];
  dataSource: any;

  constructor(
    private sercoursesService: SerCoursesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchCourses();
  }
  //Comparer Function    
  GetSortOrder(prop: string) {
    return function (a: any, b: any) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  applyFilterWithKeyUp(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  fetchCourses() {
    this.authService.getUserInformation().subscribe((user: any) => {
      this.sercoursesService.getAllCourses()
        .subscribe(coursesObservableUnsorted => {
          this.courses = coursesObservableUnsorted.sort(this.GetSortOrder("course_id"));
          this.dataSource = new MatTableDataSource(this.courses);
        });
    })

  }

  deleteCourse(course_id: string) {
    if (window.confirm("¿Estás seguro que deseas eliminar el curso?")) {
      this.sercoursesService.deleteCourse(course_id).subscribe({
        next: v => {
          console.info(v);
          this.fetchCourses();
        },
        error: err => alert('Existen estudiante(s) asignados a este curso, primero deben desasignarse para poder eliminar este curso')
      })
    }
  }
}
