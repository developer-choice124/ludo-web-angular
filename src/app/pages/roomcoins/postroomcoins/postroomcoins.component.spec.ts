import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostroomcoinsComponent } from './postroomcoins.component';

describe('PostroomcoinsComponent', () => {
  let component: PostroomcoinsComponent;
  let fixture: ComponentFixture<PostroomcoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostroomcoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostroomcoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
