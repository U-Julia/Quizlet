import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonComponent } from './lesson.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to the next term if there are more terms', () => {
    component.index = 0;
    component.module =
      {
        id: 1,
        terms:
          [
            {term: 'one', translation: 'один'},
            {term: 'two', translation: 'два'},
            {term: 'three', translation: 'три'},
          ],
        title: 'numbers',
      };
    component.showTranslationStatus = true;
    component.goNext();
    expect(component.index).toBe(1);
    expect(component.currentTerm.term).toBe('two');
    expect(component.showTranslationStatus).toBe(false);
  });

  it('should go to the previous term if there are more terms', () => {
    component.index = 2;
    component.module =
      {
        id: 1,
        terms:
          [
            {term: 'one', translation: 'один'},
            {term: 'two', translation: 'два'},
            {term: 'three', translation: 'три'},
          ],
        title: 'numbers',
      };
    component.showTranslationStatus = true;
    component.goBack();
    expect(component.index).toBe(1);
    expect(component.currentTerm.term).toBe('two');
    expect(component.showTranslationStatus).toBe(false);
  });

  it('should check answer', () => {
    component.inputText = 'два';
    component.module =
      {
        id: 1,
        terms:
          [
            {term: 'one', translation: 'один'},
            {term: 'two', translation: 'два'},
            {term: 'three', translation: 'три'},
          ],
        title: 'numbers',
      };

    component.translationStatus = false;
    component.showTranslationStatus = false;

    expect(component.translationStatus).toBe(false);
    expect(component.showTranslationStatus).toBe(false);

    component.check();

    expect(component.translationStatus).toBe(true);
    expect(component.showTranslationStatus).toBe(true);
  });
});
