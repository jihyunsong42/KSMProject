import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ETFComponent } from './etf.component';

describe('ETFComponent', () => {
  let component: ETFComponent;
  let fixture: ComponentFixture<ETFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ETFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ETFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
