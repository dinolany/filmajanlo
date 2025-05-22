import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Film } from '../../models/film.model';

@Component({
  selector: 'app-film-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './film-filter.component.html'
})
export class FilmFilterComponent {
  @Input() films: Film[] = [];
  @Output() filtered = new EventEmitter<Film[]>();

  filterType: 'title' | 'rating' | null = null;
  titleSearch = '';
  ratingSearch: number | null = null;

  applyFilter() {
    let result: Film[] = [];

    if (this.filterType === 'title' && this.titleSearch.trim()) {
      const keyword = this.titleSearch.toLowerCase();
      result = this.films.filter(f => f.title.toLowerCase().includes(keyword));
    } else if (this.filterType === 'rating' && this.ratingSearch !== null) {
      result = this.films.filter(f => f.rating === this.ratingSearch);
    } else {
      result = this.films; // ha nincs szűrés
    }

    this.filtered.emit(result);
  }

  clearFilter() {
    this.filterType = null;
    this.titleSearch = '';
    this.ratingSearch = null;
    this.filtered.emit(this.films);
  }
}
