import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  formErrors = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: ''
  };

  validationMessages = {
    firstname: {
       required: 'First name is required.',
       minlength: 'First name must be at least 2 charcters long.',
       maxlength: 'First name can not be more than 15 characters long.'
    },
    lastname: {
       required: 'Last name is required.',
       minlength: 'Last name must be at least 2 characters long.',
       maxlength: 'Last name can not be more than 15 characters long.'
    },
    telnum: {
       required: 'tel number is required.',
       pattern: 'te number must contain numbers only.'
    },
    email: {
       required: 'email is required.',
       email: 'email is not in valid format.'
    },
  };


  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contactType: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
  onValueChanged(data?: any){
    if (!this.feedbackForm){ return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.invalid && control.dirty){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
