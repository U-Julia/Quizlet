import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.scss']
})
export class EditLanguageComponent implements OnInit {
  form = new FormGroup({
    languages: new FormArray([])
  })

  constructor() {
  }

  get languages(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  ngOnInit(): void {
    this.addLanguages();
  }

  createLanguageFormGroup() {
    return new FormGroup({
      learningLanguage: new FormControl(),
      nativeLanguage: new FormControl()
    })
  }

  addLanguages(): void {
    this.languages.push(this.createLanguageFormGroup());
  }

  deleteLanguage(index: number): void {
    this.languages.removeAt(index);
  }

}
