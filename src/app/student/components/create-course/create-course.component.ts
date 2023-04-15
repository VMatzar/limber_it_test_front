import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SerCoursesService } from '@core/services/ser-courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sercourseService: SerCoursesService
  ) {
    this.buildForm();
  }

  crearCurso(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      let value = this.form.value;
      this.sercourseService.createCourse(value)
        .subscribe((rtaObservable) => {
          console.log(rtaObservable);
          this.router.navigate(['/courses']);
        });
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      teacher: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      credits: ['', [Validators.required]],
    });
  }
}
