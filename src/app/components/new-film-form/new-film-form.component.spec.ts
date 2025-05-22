import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilmFormComponent } from './new-film-form.component';

describe('NewFilmFormComponent', () => {
  let component: NewFilmFormComponent;
  let fixture: ComponentFixture<NewFilmFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFilmFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFilmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
