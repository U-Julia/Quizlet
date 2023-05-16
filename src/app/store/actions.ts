import {Action} from "@ngrx/store";

import {Module} from "../models/model";

export const GET_MODULES = 'GET_MODULES';

export class GetModules implements Action {
  readonly type = GET_MODULES;

  constructor(public payload: Module[]) {
  };
}

export const SET_MODULES = 'SET_MODULES';

export class SetModules implements Action {
  readonly type = SET_MODULES;

  constructor(public payload: Module[]) {
  };
}

export type ModuleActions =
  GetModules |
  SetModules;
