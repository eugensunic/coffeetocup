import { TestBed } from '@angular/core/testing';
import { UnauthorizedInterceptor } from './error-interceptor';

describe('UnauthorizedInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnauthorizedInterceptor = TestBed.get(UnauthorizedInterceptor);
    expect(service).toBeTruthy();
  });
});
