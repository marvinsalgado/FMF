import { TestBed } from '@angular/core/testing';

import { ClubesServiceService } from './clubes-service.service';

describe('ClubesServiceService', () => {
  let service: ClubesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
