import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from '../../models/film.model';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './film-list.component.html'
})
export class FilmListComponent {
  @Input() films: Film[] = [];
  selectedFilmId: number | null = null;

  shownReviews: Record<number, boolean> = {};

  constructor(private reviewService: ReviewService) {}

  openRating(filmId: number) {
    this.selectedFilmId = filmId;
  }

  closeRating() {
    this.selectedFilmId = null;
  }

  toggleReviews(filmId: number) {
    this.shownReviews[filmId] = !this.shownReviews[filmId];
  }

  getReviewsFor(filmId: number): Review[] {
    return this.reviewService.getByFilmId(filmId);
  }

  isShowingReviews(filmId: number): boolean {
    return !!this.shownReviews[filmId];
  }
}
