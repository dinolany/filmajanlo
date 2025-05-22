import { Injectable } from '@angular/core';
import { Film } from '../models/film.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilmService {
  private storageKey = 'films';
  private films: Film[] = [];
  films$ = new BehaviorSubject<Film[]>([]);

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.films = JSON.parse(stored);
    } else {
      // Előre feltöltött filmek
      this.films = [
        {
          id: Date.now() + 1,
          title: 'Elk*rtuk',
          rating: 1,
          comment: '2006-ban Budapesten valami összetört. Az akkor tizenhat éves Magyar Köztársaság vezetőjének kiszivárgott “őszödi beszéde” alapjaiban rengette meg az emberek demokráciába és a kommunizmus utáni rendszerváltozásba vetett hitét. Magyarország első, valós eseményeken alapuló politikai krimije ebbe az időszakba, 2006 indulatokkal teli őszére kalauzolja el nézőit egy fiatal, feltörekvő elemzőlány történetén keresztül.',
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 2,
          title: 'Inception',
          rating: 4,
          comment: 'Elgondolkodtató és látványos.',
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 3,
          title: 'Interstellar',
          rating: 5,
          comment: 'Lélekemelő sci-fi remekmű.',
          dateAdded: new Date().toISOString()
        }
      ];
      this.save();
    }

    this.films$.next(this.films);
  }

  getAll(): Film[] {
    return [...this.films];
  }

  add(film: Omit<Film, 'id' | 'dateAdded'>) {
    const newFilm: Film = {
      ...film,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    };
    this.films.push(newFilm);
    this.save();
  }

  remove(id: number) {
    this.films = this.films.filter(f => f.id !== id);
    this.save();
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.films));
    this.films$.next(this.films);
  }
}
