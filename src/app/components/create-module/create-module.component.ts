import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModulesService} from "../../services/modules.service";
import {Module, Terms} from "../../models/model";
import {catchError, throwError} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-card',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss']
})
export class CreateModuleComponent implements OnInit {
  public id: number;
  public module: Module;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    terms: new FormArray([], [Validators.required, Validators.minLength(1)])
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modulesService: ModulesService,
    private messageService: MessageService
  ) {}

  get moduleName() {
    return this.form.get('title');
  }

  get terms(): FormArray {
    return this.form.get('terms') as FormArray;
  }

  get translation() {
    return this.form.get('translation');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = +value.get('id');
      if (this.id) {
        this.modulesService.getModuleById(this.id).subscribe(module => {
          this.module = module;
          this.module.terms.forEach(term => this.addTerm(term))
          this.moduleName.patchValue(this.module.title);
        });
      } else {
        this.addTerm();
      }
    })
  }

  createModule(): void {
    this.form.markAllAsTouched();
    this.form.markAsDirty();
    if (this.form.valid) {
      if (this.module) {
        this.modulesService.updateModule({...this.form.value, id: this.module.id}).pipe(
          catchError(err => {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Error',
              detail: 'Module is not updated!'
            });
            return throwError(err)
          })
        ).subscribe(() => {
            this.messageService.add({
              key: 'bc',
              severity: 'success',
              summary: 'Success',
              detail: 'The module was successfully updated!'
            });
            this.router.navigate(['/']);
          }
        )
      } else {
        this.modulesService.addModule(this.form.value.title, this.form.value.terms).pipe(
          catchError(err => {
            this.messageService.add({
              key: 'bc',
              severity: 'error',
              summary: 'Error',
              detail: 'Module is not added!'
            });
            return throwError(err)
          })
        ).subscribe();
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'The module was successfully added!'
        });
        this.router.navigate(['/'])

      }
    }
  }

  addTerm(term?: Terms): void {
    this.form.updateValueAndValidity();
    this.terms.push(this.createTermFormGroup(term));
  }

  createTermFormGroup(term?: Terms) {
    const formGroup = new FormGroup({
      term: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required)
    })
    if (term) {
      formGroup.patchValue(term);
    }
    return formGroup;
  }

  deleteTerm(index: number): void {
    this.terms.removeAt(index);
  }
}
