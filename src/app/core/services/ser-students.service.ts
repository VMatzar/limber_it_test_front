import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Student } from '@core/models/student.model';
@Injectable({
  providedIn: 'root'
})
export class SerStudentsService {
  private http = inject(HttpClient);
  //*Utils:
  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error('Algo salio mal en la solicitud HTTP'));
  }

  getAllStudent() {
    return this.http.get<Student[]>(`${environment.url_api}/students/`).pipe(
      catchError(this.handleError)
    );
  }
  getStudent(id: string) {
    return this.http.get<Student[]>(`${environment.url_api}/students/${id}/`).pipe(
      catchError(this.handleError)
    );
  }
  createStudent(student: Student) {
    return this.http.post(`${environment.url_api}/students/`, student).pipe(
      catchError(this.handleError)
    );
  }
  updateStudent(id: string, changes: Partial<Student>) {
    return this.http.put(`${environment.url_api}/students/${id}`, changes).pipe(
      catchError(this.handleError)
    );
  }
  deleteStudent(id: String) {
    return this.http.delete(`${environment.url_api}/students/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }
}






