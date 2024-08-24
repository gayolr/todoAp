import { TestBed } from '@angular/core/testing';

import { ServiceApiTodoService } from './service-api-todo.service';

describe('ServiceApiTodoService', () => {
  let service: ServiceApiTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
