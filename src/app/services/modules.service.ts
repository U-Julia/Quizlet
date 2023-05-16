import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Module, Terms} from "../models/model";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  public modulesUrl = 'api/modules';

  constructor(private http: HttpClient,
  ) {
  }

  public getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.modulesUrl)
      .pipe(
        catchError(this.handleError<Module[]>('getModules', []))
      )
  }

  public getModuleById(moduleId: number): Observable<Module> {
    return this.http.get<Module>(`${this.modulesUrl}/${moduleId}`);
  }

  public updateModule(module: Module): Observable<void> {
    return this.http.put<void>(`${this.modulesUrl}/${module.id}`, module);
  }

  public addModule(title: string, terms: Terms[]): Observable<Module> {
    return this.http.post<Module>(this.modulesUrl, {
      id: null,
      title,
      terms,
    });
  }

  public deleteModule(moduleId: number): Observable<Module> {
    return this.http.delete<Module>(`${this.modulesUrl}/${moduleId}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }


}
