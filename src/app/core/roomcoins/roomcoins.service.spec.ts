import { TestBed } from '@angular/core/testing';

import { RoomcoinsService } from './roomcoins.service';

describe('RoomcoinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomcoinsService = TestBed.get(RoomcoinsService);
    expect(service).toBeTruthy();
  });
});
