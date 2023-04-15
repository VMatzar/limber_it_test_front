import { Component, OnInit } from '@angular/core';
import { Course } from '@core/models/course.model';
import { SerCoursesService } from '@core/services/ser-courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@core/services/auth.service';

interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  displayedColumns: string[] = ['course_id', 'name', 'credits', 'teacher', 'assigned', 'actions'];
  dataSource: any;
  userId: string = '';

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
      this.userId = user!.uid;
      this.sercoursesService.getAllCourse(this.userId)
        .subscribe(coursesObservableUnsorted => {
          this.courses = coursesObservableUnsorted.sort(this.GetSortOrder("course_id"));
          this.dataSource = new MatTableDataSource(this.courses);
        });
    })

  }
  register(course_id: string) {
    this.sercoursesService.createRegistration(this.userId, course_id).subscribe({
      next: value => {
        console.info(value);
        this.changeAssignmentStatusDom(course_id);
      }
    })
  }
  deleteRegistration(course_id: string) {
    this.sercoursesService.deleteRegistration(this.userId, course_id).subscribe({
      next: value => {
        console.info(value);
        this.changeAssignmentStatusDom(course_id);
      }
    })
  }
  changeAssignmentStatusDom(course_id: string) {
    let indice = this.courses.findIndex((course: Course) => course.course_id === course_id);
    this.courses[indice].assigned = !this.courses[indice].assigned;
  }
}
