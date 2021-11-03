import { TestBed } from '@angular/core/testing';
import { KeepSessionAliveService } from './keep-session-alive.service';

describe('KeepSessionAliveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeepSessionAliveService = TestBed.get(KeepSessionAliveService);
    expect(service).toBeTruthy();
  });
});
