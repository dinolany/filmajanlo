import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFilterComponent } from './film-filter.component';

describe('FilmFilterComponent', () => {
  let component: FilmFilterComponent;
  let fixture: ComponentFixture<FilmFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
