import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingData } from './listing';

describe('ListingData', () => {
  let component: ListingData;
  let fixture: ComponentFixture<ListingData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listing],
    }).compileComponents();

    fixture = TestBed.createComponent(Listing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
