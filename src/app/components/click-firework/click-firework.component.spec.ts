import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickFireworkComponent } from './click-firework.component';

describe('ClickFireworkComponent', () => {
  let component: ClickFireworkComponent;
  let fixture: ComponentFixture<ClickFireworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickFireworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickFireworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
