import { TestBed } from '@angular/core/testing';

import { RegSecUserService } from './reg-sec-user.service';

describe('RegSecUserService', () => {
  let service: RegSecUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegSecUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
