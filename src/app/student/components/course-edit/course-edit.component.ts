import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SerCoursesService } from '@core/services/ser-courses.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  form!: FormGroup;
  course_id: string = '';
  constructor(
    private sercourseService: SerCoursesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }
  saveCourse(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const course = this.form.value;
      this.sercourseService.updateCourse(this.course_id, course)
        .subscribe((courseObservable) => {
          alert('Información Actualizada');
          this.router.navigate(['./courses']);
        });
    }
  }
  ngOnInit() {
    this.course_id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.sercourseService.getCourse(this.course_id)
      .subscribe(studentObservable => {
        let jsonElement = studentObservable[0];
        this.form.patchValue(jsonElement);
      });
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      teacher: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      credits: ['', [Validators.required]],
    });
  }
}