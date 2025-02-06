import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkToAHumanComponent } from './talk-to-a-human.component';

describe('TalkToAHumanComponent', () => {
  let component: TalkToAHumanComponent;
  let fixture: ComponentFixture<TalkToAHumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalkToAHumanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkToAHumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
