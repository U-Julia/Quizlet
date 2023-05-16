import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";

import {Module} from "../../models/model";
import {ModulesService} from "../../services/modules.service";
import * as moduleActions from '../../store/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public modules: Module[] = [];
  public id: string;
  public selectedModule: Module;

  private moduleSub: Subscription;

  constructor(
    private modulesService: ModulesService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.getModules();
    this.getStoreData();
  }

  private getModules(): void {
    this.modulesService.getModules()
      .subscribe((modules: Module[]) => {
        this.store.dispatch(new moduleActions.SetModules(modules))
      })
  }

  private getStoreData() {
    this.moduleSub = this.store
      .pipe(
        select(
          (moduleState: any) =>
            moduleState['modules']['modules']
        )
      )
      .subscribe((modules) => {
        if (modules) {
          this.modules = modules;
        }
      })
  }

  public navigateToLesson(id: any) {
    this.router.navigate(['/lesson', id]);
  }

  public createModule() {
    this.router.navigate(['/create-module']);
  }

  public editModule(id: any) {
    this.router.navigate(['/create-module', id]);
  }

  public selectModule(module: any) {
    this.selectedModule = this.selectedModule === module ? null : module;
  }

  public deleteModule() {
    this.modulesService.deleteModule(this.selectedModule.id)
      .subscribe(() => {
        this.selectedModule = null;
        this.messageService.add({
          key: 'bc',
          severity: 'success',
          summary: 'Success',
          detail: 'The module was successfully removed!'
        });
        this.getModules();
      })
  }

  ngOnDestroy(): void {
    this.moduleSub.unsubscribe();
  }
}
