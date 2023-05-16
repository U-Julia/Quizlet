import {Module} from "../models/model";
import * as moduleActions from './actions';

export interface ModuleState {
  modules: Module[];
}

const initialState: ModuleState = {
  modules: null
}

export function moduleReducer(state: ModuleState = initialState, action: moduleActions.ModuleActions) {
  switch (action.type) {
    case moduleActions.SET_MODULES:
      return {
        ...state,
        modules: action.payload
      };
    default:
      return state;
  }
}
