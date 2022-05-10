import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappupdateComponent } from './createappupdate.component';

describe('CreateappupdateComponent', () => {
  let component: CreateappupdateComponent;
  let fixture: ComponentFixture<CreateappupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateappupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateappupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
