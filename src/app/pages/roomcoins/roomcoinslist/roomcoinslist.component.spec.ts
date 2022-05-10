import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomcoinslistComponent } from './roomcoinslist.component';

describe('RoomcoinslistComponent', () => {
  let component: RoomcoinslistComponent;
  let fixture: ComponentFixture<RoomcoinslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomcoinslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomcoinslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
