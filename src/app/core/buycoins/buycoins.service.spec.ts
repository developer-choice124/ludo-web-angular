import { TestBed } from '@angular/core/testing';

import { BuycoinsService } from './buycoins.service';

describe('BuycoinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuycoinsService = TestBed.get(BuycoinsService);
    expect(service).toBeTruthy();
  });
});
