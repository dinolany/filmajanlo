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
          dateAdded: new Date().toISOString(),
          posterUrl: 'assets/plakat1.jpg'
        },
        {
          id: Date.now() + 2,
          title: 'Jojo Nyuszi',
          rating: 4,
          comment: 'Taika Waititi (THOR: RAGNARÖK, VADEMBEREK HAJSZÁJA) író-rendező a tőle megszokott stílusban készítette el humorral és érzelemmel teli új filmjét, a JOJO NYUSZI-t. A második világháború idején a magányos német kisfiú, Jojo elképzelései a világról alapjaiban rendülnek meg, amikor felfedezi, hogy egyedülálló anyukája egy zsidó lányt rejteget házuk padlásán. Csupán tökkelütött képzeletbeli barátjára, Adolf Hitlerre támaszkodva, Jojo kénytelen átértékelni megrögzött nacionalista gondolkodásmódját.',
          dateAdded: new Date().toISOString(),
          posterUrl: 'assets/plakat2.png'
        },
        {
          id: Date.now() + 3,
          title: 'Ken Park',
          rating: 5,
          comment: 'Négy tinédzser, négy gyerekkori barát - három fiú és egy lány - élete tárul fel előttünk: az erőszak, a szex, a gyűlölet, a szeretet és az érzelmi zavarodottság minden fázisával. Claude gördeszkás srác, aki egyszerre gyűlöli és szereti apját. Shawn inkább a szex iránt érdeklődik: halálosan belezúg barátnője húsz évvel idősebb anyjába. Peaches, a társaság lánytagja mindenáron el szeretne menekülni otthonról őrülten bigott apjától. Tate eközben nagyszülei túlzottan gondoskodó szeretetétől szenved. És persze ott van az ötödik haver is: Ken Park, de ő már csak múlt időben... ',
          dateAdded: new Date().toISOString(),
          posterUrl: 'assets/plakat3.jpg'
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
      dateAdded: new Date().toISOString(),
      posterUrl: 'assets/default_poster.png'
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

