import { TestBed } from '@angular/core/testing';

import { ShopItemResolverService } from './shop-item-resolver.service';

describe('ShopItemResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopItemResolverService = TestBed.get(ShopItemResolverService);
    expect(service).toBeTruthy();
  });
});
