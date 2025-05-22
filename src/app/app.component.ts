import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { NewFilmFormComponent } from './components/new-film-form/new-film-form.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmFilterComponent } from './components/film-filter/film-filter.component';
import { FilmService } from './services/film.service';
import { Film } from './models/film.model';
//trashcontent
import { CursorTrailComponent } from './components/cursor-trail/cursor-trail.component';
import { ClickFireworkComponent } from './components/click-firework/click-firework.component';
import { SnowfallComponent } from './components/snowfall/snowfall.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    NewFilmFormComponent,
    FilmListComponent,
    FilmFilterComponent,
    CursorTrailComponent,
    ClickFireworkComponent,
    SnowfallComponent
],
  templateUrl: './app.component.html'
})
export class AppComponent {
  username: string | null = localStorage.getItem('username');
  showModal = false;
  films: Film[] = [];
  allFilms: Film[] = [];

  constructor(private filmService: FilmService) {
    this.loadFilms();
  }

  handleLogin(name: string) {
    this.username = name;
  }

  logout() {
    localStorage.removeItem('username');
    this.username = null;
  }

  handleNewFilm(data: { title: string; rating: number; comment: string }) {
    this.filmService.add(data);
    this.loadFilms();
    this.showModal = false;
  }

  loadFilms() {
    this.allFilms = this.filmService.getAll();
    this.films = [...this.allFilms];
  }

  applyFilteredList(filtered: Film[]) {
    this.films = filtered;
  }
}
