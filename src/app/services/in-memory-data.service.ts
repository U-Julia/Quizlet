import {Injectable} from '@angular/core';
import {Module} from "../models/model";
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const modules: Module[] = [
      {id: 1, title: '55', terms: [{term: "cat", translation: "кіт"}, {term: "book", translation: "книга"}, {term: "table", translation: "стіл"}]},
      {id: 2, title: 'one', terms: [{term: "hand", translation: "рука"}, {term: "leg", translation: "нога"}, {term: "finger", translation: "палець"} ]},
      {id: 3, title: 'two', terms: [{term: "spoon", translation: "ложка"}]},
      {id: 4, title: 'three', terms: [{term: "result", translation: "результат"}]},
      {id: 5, title: 'four', terms: [{term: "pencil", translation: "олівець"}]},
      {id: 6, title: 'five', terms: [{term: "sun", translation: "сонце"}]},
    ];
    return {modules};
  }

  genId(modules: Module[]): number {
    return modules.length > 0 ? Math.max(...modules.map(module => module.id)) + 1 : 1;
  }

  constructor() {
  }
}
