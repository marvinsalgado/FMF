import { TestBed } from '@angular/core/testing';

import { NacionalidadesServiceService } from './nacionalidades-service.service';

describe('NacionalidadesServiceService', () => {
  let service: NacionalidadesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NacionalidadesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
