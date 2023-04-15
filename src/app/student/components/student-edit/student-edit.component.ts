import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SerStudentsService } from '@core/services/ser-students.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  constructor(
    private serstudentService: SerStudentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }
  saveStudent(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const student = this.form.value;
      this.serstudentService.updateStudent(this.id, student)
        .subscribe((studentObservable) => {
          // console.log(studentObservable);
          alert('Información Actualizada');
          this.router.navigate(['./student']);
        });
    }
  }
  ngOnInit() {
    this.authService.getUserInformation().subscribe(user => {
      this.id = user!.uid;
      this.serstudentService.getStudent(user!.uid)
        .subscribe(studentObservable => {
          let jsonElement = studentObservable[0];
          const {date_of_birth,...rest} = jsonElement;
          this.form.patchValue(rest);

          const fechaNac = new Date(jsonElement.date_of_birth);
          fechaNac.setDate(fechaNac.getDate() + 1);
          this.form.get('date_of_birth')!.setValue(formatDate(fechaNac, 'yyyy-MM-dd', 'en'));

        });
    });


  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      date_of_birth: [''],
      gender: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
    });
  }
  get date_of_birth() {
    return this.form.get('date_of_birth')!.value;
  }

}
