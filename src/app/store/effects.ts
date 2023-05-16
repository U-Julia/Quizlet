import {Injectable} from "@angular/core";

import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from 'rxjs/operators';
import * as moduleActions from './actions';
import {ModulesService} from "../services/modules.service";

@Injectable()
export class ModuleEffects {

  constructor(
    private actions$: Actions,
    private modulesService: ModulesService,
  ) {}

  getModules = createEffect(() =>
    this.actions$.pipe(
      ofType(moduleActions.GET_MODULES),
      mergeMap(() => {
        return this.modulesService.getModules()
      }),
      map(modules => {
        return {
          type: moduleActions.SET_MODULES,
          payload: modules
        };
      })
    )
  )
}
