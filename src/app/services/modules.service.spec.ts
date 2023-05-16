import {TestBed} from '@angular/core/testing';

import {ModulesService} from './modules.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Module} from "../models/model";

describe('ModulesService', () => {
  let service: ModulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModulesService],
    });
    service = TestBed.inject(ModulesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a module by id', () => {
    const mockModule: Module = {
      id: 1,
      title: 'Module 1',
      terms: [{term: 'sun', translation: 'сонце'}],
    };

    service.getModuleById(1).subscribe((module) => {
      expect(module).toEqual(mockModule);
    });

    const req = httpMock.expectOne(`${service.modulesUrl}/1`);

    expect(req.request.method).toBe('GET');

    req.flush(mockModule);
  });

  it('should add a new module', () => {
    const newModule: Module = {
      id: 2, title: 'Test Module',
      terms: [{term: 'test', translation: 'тест'}]
    };
    service.addModule(newModule.title, newModule.terms).subscribe((module) => {
      expect(module.id).toBeGreaterThan(0);
      expect(module.title).toEqual(newModule.title);
      expect(module.terms.length).toEqual(newModule.terms.length);
    });

    const req = httpMock.expectOne((service.modulesUrl));
    expect(req.request.method).toEqual('POST');
    req.flush({...newModule, id: 1});
  });

  it('should update module', () => {
    const module: Module = {
      id: 2,
      title: 'Test Module',
      terms: [{term: 'test', translation: 'тест'}]
    };
    service.updateModule(module).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${service.modulesUrl}/${module.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });
});
