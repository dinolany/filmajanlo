import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private storageKey = 'reviews';
  private reviews: Review[] = [];

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    this.reviews = stored ? JSON.parse(stored) : [];
  }

  getByFilmId(filmId: number): Review[] {
    return this.reviews.filter(r => r.filmId === filmId);
  }

  addReview(filmId: number, rating: number, comment: string, reviewer: string) {
  const newReview: Review = {
    id: Date.now(),
    filmId,
    rating,
    comment,
    reviewer,
    date: new Date().toISOString()
  };

  this.reviews.push(newReview);
  this.save();
}
  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.reviews));
  }
}
