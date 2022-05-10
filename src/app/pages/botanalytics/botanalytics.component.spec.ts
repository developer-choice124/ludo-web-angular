import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotanalyticsComponent } from './botanalytics.component';

describe('AnalyticsComponent', () => {
  let component: BotanalyticsComponent;
  let fixture: ComponentFixture<BotanalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotanalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
