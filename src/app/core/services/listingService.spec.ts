import { TestBed } from '@angular/core/testing';

import { ListingService } from "./listingService";

describe("ListingData", () => {
  let service: ListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListingService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
