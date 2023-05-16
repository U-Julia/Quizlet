import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";

import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public isShowMessage: boolean;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phoneNumber: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
  })

  constructor(private messageService: MessageService) {
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    this.form.markAsTouched();
    if (this.form.valid) {
      const email = sessionStorage.getItem(`${this.form.value.email}`);
      if (email) {
        const person = JSON.parse(email);
        if (person.email === this.form.value.email) {
          this.messageService.add({
            key: 'bc',
            severity: 'error',
            summary: 'Error',
            detail: 'A user with this email already exists!'
          });
        }
      } else {
        sessionStorage.setItem(`${this.form.value.email}`, JSON.stringify(this.form.value));
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'You are registered successfully!'
        });
        this.form.reset();
      }
    }
  }
}
