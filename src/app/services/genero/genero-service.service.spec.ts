import { TestBed } from '@angular/core/testing';

import { GeneroServiceService } from './genero-service.service';

describe('GeneroServiceService', () => {
  let service: GeneroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
