import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppupdatelistComponent } from './appupdatelist.component';

describe('AppupdatelistComponent', () => {
  let component: AppupdatelistComponent;
  let fixture: ComponentFixture<AppupdatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppupdatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppupdatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
