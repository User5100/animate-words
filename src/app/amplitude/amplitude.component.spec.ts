import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplitudeComponent } from './amplitude.component';

describe('AmplitudeComponent', () => {
  let component: AmplitudeComponent;
  let fixture: ComponentFixture<AmplitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmplitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmplitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
