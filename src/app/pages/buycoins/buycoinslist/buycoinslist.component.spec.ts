import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuycoinslistComponent } from './buycoinslist.component';

describe('BuycoinslistComponent', () => {
  let component: BuycoinslistComponent;
  let fixture: ComponentFixture<BuycoinslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuycoinslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuycoinslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
