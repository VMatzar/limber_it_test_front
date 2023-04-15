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
  

  orderStatus: Status[] = [
    { value: 'Asignado', viewValue: 'Asignado' },
    { value: 'no_asignado', viewValue: 'no_asignado' },
  ];

  selectedStatus!: string;
  constructor(
    private sercoursesService: SerCoursesService,
    private authService: AuthService
  ) {

  }

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
  applyFilterWithButton(status: string) {
    this.dataSource.filter = status.trim().toLowerCase();
  }
  fetchCourses() {
    this.authService.getUserInformation().subscribe((user:any) => {
      let id = user!.uid;
      this.sercoursesService.getAllCourse(id)
      .subscribe(coursesObservableUnsorted => {
        this.courses = coursesObservableUnsorted.sort(this.GetSortOrder("course_id"));
        this.dataSource = new MatTableDataSource(this.courses);
      });
    })
    
  }

  // changeStatus(event: any, id: string) {
  //   var selectElement = event.target;
  //   var value = selectElement.value;
  //   let change = {
  //     status: value
  //   }
    
  //   this.sercoursesService.postRegistration(id, change).subscribe((responseObservable: any) => {
  //     console.log(responseObservable)
  //   });
  // }
}
