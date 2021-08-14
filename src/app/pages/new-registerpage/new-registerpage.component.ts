import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CountriesTable } from 'src/app/models/countries.table';
import { IRegisterModel, RegisterModel } from 'src/app/models/RegisterControl.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-new-registerpage',
  templateUrl: './new-registerpage.component.html',
  styleUrls: ['./new-registerpage.component.css']
})
export class NewRegisterpageComponent implements OnInit {

  registerForm: FormGroup;
  currRegister: IRegisterModel = new RegisterModel();
  submitted = false;
  titleRequired = false;
  isStartSaveData = false;
  standardCountries = CountriesTable.Countries;
  donSubmit = false;
  constructor( private fb: FormBuilder , private toastr: ToastrService , private http: HttpClient) { }

  ngOnInit(): void {
    this.loadForm();
  }

  // tslint:disable-next-line:typedef
  loadForm() {
    this.registerForm = this.fb.group({
      childName: [this.currRegister.childName, Validators.compose([Validators.required])],
      fatherName: [this.currRegister.fatherName, Validators.compose([Validators.required])],
      age: [this.currRegister.age, Validators.compose([Validators.required])],
      gender: [this.currRegister.gender , Validators.compose([Validators.required])],
      mobile: [this.currRegister.mobile , Validators.compose([Validators.required])],
      wahtsapp: [this.currRegister.wahtsapp , Validators.compose([Validators.required])],
      email: [this.currRegister.email, Validators.compose([Validators.email , Validators.required , Validators.maxLength(450)])],
      country: [this.currRegister.country , Validators.compose([Validators.required])],
      address: [this.currRegister.address],
      course: [this.currRegister.course , Validators.compose([Validators.required])],
      additionalComments: [this.currRegister.additionalComments],
    });
  }

  onSubmit(): boolean {
    this.registerForm.markAllAsTouched();
    this.submitted = true;
    this.titleRequired = false;
    if (this.registerForm.invalid) {
      this.toastr.error('Error', 'There is validation error, please check it!');
      return;
    }

    this.onSubmitEmailJsTest();
  }

  // tslint:disable-next-line:typedef
  doSendEmail() {
    this.isStartSaveData = true;
    this.donSubmit = true;
    window.scroll(0 , 0 );
    this.isStartSaveData = false;
  }

  // tslint:disable-next-line:typedef
  doSendEmailonSubmit() {
    this.isStartSaveData = true;
    if (this.registerForm.status === 'VALID') {
      this.registerForm.disable(); // disable the form if it's valid to disable multiple submissions
      const formData: any = new FormData();
      formData.append('name', this.registerForm.get('childName').value);
      formData.append('email', this.registerForm.get('email').value);
      formData.append('message', this.registerForm.get('additionalComments').value);
      this.isStartSaveData = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      // tslint:disable-next-line:max-line-length
      this.http.post('https://script.google.com/macros/s/AKfycbxz1N5aJNeJSZVBYwyHtbY8PAL8LJDKP-GItcZi9TS_mHUMi7v5szFVhaOT9VZ1ZE7H/exec', formData).subscribe(
        (response) => {
          // choose the response message
          // tslint:disable-next-line:no-string-literal
          if (response['result'] === 'success') {
            this.donSubmit = true;
            window.scroll(0 , 0 );
          } else {
            this.donSubmit = false;
          }
          this.registerForm.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isStartSaveData = false; // re enable the submit button
          console.log(response);
        },
        (error) => {
          this.donSubmit = false;
          this.registerForm.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isStartSaveData = false; // re enable the submit button
          console.log(error);
        }
      );
    }
  }

  // tslint:disable-next-line:typedef
  testNewSend(){
    emailjs.sendForm('service_gkw0qch', 'template_8bbf5ob', '<h1>test send first email</h1>', 'user_9sUEJSSrmpgXt2sYVzuoS')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  // tslint:disable-next-line:typedef
  onSubmitEmailJsTest() {
    this.isStartSaveData = true;
    this.registerForm.disable();
    const formData = this.registerForm.value;

    const mesaagevalue = `<div>
    <b> Child Name : </b> <i>` + formData.childName + `</i> <br/>
    <b> Father Name : </b> <i>` + formData.fatherName + `</i> <br/>
    <b> Age : </b> <i>` + formData.age + `</i> <br/>
    <b> Gender : </b> <i>` + formData.gender + `</i> <br/>
    <b> Mobile Number : </b> <i>` + formData.mobile + `</i> <br/>
    <b> WhatsApp Number : </b> <i>` + formData.wahtsapp + `</i> <br/>
    <b> Email : </b> <i>` + formData.email + `</i> <br/>
    <b> Country : </b> <i>` + formData.country + `</i> <br/>
    <b> Address : </b> <i>` + formData.address + `</i> <br/>
    <b> Course : </b> <i>` + formData.course + `</i> <br/>
    <b> Additional Comments : </b> <i>` + formData.additionalComments + `</i> <br/>
    </div>`;

    const mesaagevalue2 =

    '\n' + 'Child Name : ' + formData.childName +
    '\n' + 'Father Name :'  + formData.fatherName +
    '\n' + 'Age : ' + formData.age +
    '\n' + 'Gender :'  + formData.gender +
    '\n' + 'Mobile Number :' + formData.mobile +
    '\n' + 'WhatsApp Number :' + formData.wahtsapp +
    '\n' + 'Email :' + formData.email +
    '\n' + 'Country :' + formData.country +
    '\n' + 'Address :' + formData.address +
    '\n' + 'Course :'  + formData.course +
    '\n' + ' Additional Comments : ' + formData.additionalComments;

    const data = {
      service_id: 'service_gkw0qch',
      template_id: 'template_8bbf5ob',
      user_id: 'user_9sUEJSSrmpgXt2sYVzuoS',
      template_params: {
        childName: formData.childName,
        fatherName: formData.fatherName,
        age: formData.age,
        gender: formData.gender,
        mobile: formData.mobile,
        wahtsapp: formData.wahtsapp,
        email: formData.email,
        country: formData.country,
        address: formData.address,
        course: formData.course,
        additionalComments: formData.additionalComments,
        message: 'thanks',
      }
    };

    this.http.post('https://api.emailjs.com/api/v1.0/email/send', data, { responseType: 'text' })
      .subscribe((result) => {
        this.donSubmit = true;
        window.scroll(0 , 0 );
        this.submitted = true; // show the response message
        this.isStartSaveData = false;
      }, (error: HttpErrorResponse) => {
        this.donSubmit = false;
        this.registerForm.enable(); // re enable the form after a success
        this.submitted = true; // show the response message
        this.isStartSaveData = false;
      }
    );
  }


   // helpers for View
isControlValid(controlName: string): boolean {
  const control = this.registerForm.get(controlName);
  return control.valid && (control.dirty || control.touched || this.submitted);
}

isControlInvalid(controlName: string): boolean {
  const control = this.registerForm.get(controlName);
  return control.invalid && (control.dirty || control.touched || this.submitted);
}

controlHasError(validation, controlName): boolean {
  const control = this.registerForm.get(controlName);
  return control.hasError(validation) && (control.dirty || control.touched || this.submitted);
}

isControlTouched(controlName): boolean {
  const control = this.registerForm.get(controlName);
  return control.dirty || control.touched;
}

}
