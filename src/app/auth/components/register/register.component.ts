import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { SerStudentsService } from '@core/services/ser-students.service';
import { MyValidators } from '@utils/validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private studentService: SerStudentsService
  ) {
    this.buildForm();
  }

  register(event: Event) {

    event.preventDefault();
    if (this.form.valid) {
      let value = this.form.value;
      this.authService.createUser(value.email, value.password)
        .then(() => {
          this.authService.getUserInformation().subscribe(user => {
            let id = user!.uid;
            value = { student_id: id, ...value };
            this.studentService.createStudent(value)
              .subscribe((rtaObservable) => {
                console.log(rtaObservable);
                this.router.navigate(['/student']);
              });
          })
        });
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      date_of_birth: [''],
      gender: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['', [Validators.required]],
    }, {
      //validación grupal 
      validators: MyValidators.matchPassword
    });
  }
  get date_of_birth() {
    return this.form.get('date_of_birth')!.value;
  }
}
