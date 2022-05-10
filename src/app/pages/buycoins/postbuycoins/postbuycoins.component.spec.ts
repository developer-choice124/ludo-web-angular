import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostbuycoinsComponent } from './postbuycoins.component';

describe('PostbuycoinsComponent', () => {
  let component: PostbuycoinsComponent;
  let fixture: ComponentFixture<PostbuycoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostbuycoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostbuycoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
