import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating.component.html'
})
export class RatingComponent {
  @Input() filmId!: number;
  @Output() close = new EventEmitter<void>();

  reviewer = '';
  rating = 1;
  comment = '';

  constructor(private reviewService: ReviewService) {}

  submit() {
    if (!this.reviewer.trim() || !this.comment.trim()) {
      alert('A neved és a vélemény is kötelező!');
      return;
    }

    this.reviewService.addReview(this.filmId, this.rating, this.comment.trim(), this.reviewer.trim());
    this.close.emit();
  }
}
