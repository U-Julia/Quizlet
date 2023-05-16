import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModulesService} from "../../services/modules.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
  })

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(
    private messageService: MessageService
  ) {}

  onSubmit(): void {
    if (this.form.valid) {
      const email = sessionStorage.getItem(`${this.form.value.email}`);
      if (email) {
        const person = JSON.parse(email);
        if (person.password === this.form.value.password) {
          this.messageService.add({
            key: 'bc',
            severity: 'success',
            summary: 'Success',
            detail: 'You entered successfully!'
          });
        } else {
          this.messageService.add({
            key: 'bc',
            severity: 'error',
            summary: 'Error',
            detail: 'Wrong password!'
          });
        }
      } else {
        this.messageService.add({
          key: 'bc',
          severity: 'error',
          summary: 'Error',
          detail: 'Wrong email!'
        });
      }
    }
  }
}
