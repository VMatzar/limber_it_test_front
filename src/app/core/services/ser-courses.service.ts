import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Course } from '@core/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class SerCoursesService {
  private http = inject(HttpClient);
  //*Utils:
  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error('Algo salio mal en la solicitud HTTP'));
  }

  getAllCourse(id: string) {
    return this.http.get<Course[]>(`${environment.url_api}/courses/${id}/`).pipe(
      catchError(this.handleError)
    );
  }
  getCourse(id: string) {
    return this.http.get<Course[]>(`${environment.url_api}/courses/${id}/`).pipe(
      catchError(this.handleError)
    );
  }
  createCourse(course: Course) {
    return this.http.post(`${environment.url_api}/courses/`, course).pipe(
      catchError(this.handleError)
    );
  }
  updateCourse(id: string, changes: Partial<Course>) {
    return this.http.put(`${environment.url_api}/courses/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }
  deleteCourse(id: String) {
    return this.http.delete(`${environment.url_api}/courses/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  createRegistration(studentId: string, courseId: string) {
    return this.http.post(`${environment.url_api}/registration`, { student_id: studentId, course_id: courseId }).pipe(
      catchError(this.handleError)
    );
  }
  deleteRegistration(studentId: string, courseId: string) {
    return this.http.request('delete', `${environment.url_api}/registration`, { body: { student_id: studentId, course_id: courseId } }).pipe(
      catchError(this.handleError)
    );
  }
}