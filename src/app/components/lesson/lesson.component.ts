import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModulesService} from "../../services/modules.service";
import {Module, Terms} from "../../models/model";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  public id: number;
  public module: Module;
  public currentTerm: Terms;
  public index: number = 0;
  public inputText: string;
  public showTranslationStatus: boolean;
  public translationStatus: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modulesService: ModulesService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => {
      this.id = +value.get('id');
      if (this.id) {
        this.modulesService.getModuleById(this.id).subscribe(module => {
            this.module = module;
            this.currentTerm = this.module.terms[this.index];
          }
        )
      }
    })
  }

  public goNext() {
    this.inputText = '';
    let index = this.index;
    index++;
    if (index < this.module.terms.length)
      this.index = index;
    this.currentTerm = this.module.terms[this.index];
    this.showTranslationStatus = false;
  }

  public check() {
    this.translationStatus = !!this.module.terms.find(item => item.translation.includes(this.inputText));
    this.showTranslationStatus = true;
  }

  public goBack() {
    this.inputText = '';
    let index = this.index;
    index--;
    if (index >= 0)
      this.index = index;
    this.currentTerm = this.module.terms[this.index];
    this.showTranslationStatus = false;
  }
}
