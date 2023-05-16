import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CreateModuleComponent } from './create-module.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ModulesService} from "../../services/modules.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Terms} from "../../models/model";
import {of} from "rxjs";
import {MessageService} from "primeng/api";

describe('CreateModuleComponent', () => {
  let component: CreateModuleComponent;
  let fixture: ComponentFixture<CreateModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModuleComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, FormsModule ],
      providers: [ ModulesService, MessageService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModuleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call the function addTerm',() => {
    spyOn(component, 'addTerm');

    expect(component.terms.controls.length).toEqual(0);

    component.ngOnInit();

    expect(component.addTerm).toHaveBeenCalledWith();
  });

  it('should delete module',() => {

    component.addTerm();
  });

  it('should patch form group with given term object', () => {
    const term: Terms = { term: 'apple', translation: 'яблуко' };
    const formGroup = component.createTermFormGroup(term);

    expect(formGroup.get('term').value).toEqual('apple');
    expect(formGroup.get('translation').value).toEqual('яблуко');
  });


  // it('should call the function deleteTerm',fakeAsync(() => {
  //   // fixture.detectChanges();
  //   spyOn(component, 'deleteTerm');
  //
  //   expect(component.terms).toBeDefined();
  //   expect(component.terms.length).toBe(0);
  //
  //   component.addTerm();
  //
  //   expect(component.terms.length).toBe(1);
  //
  //   component.deleteTerm(0);
  //
  //   tick();
  //
  //   expect(component.terms.controls.length).toEqual(2);
  //
  //
  // }));
});
