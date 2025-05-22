import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-film-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-film-form.component.html'
})
export class NewFilmFormComponent {
  title = '';
  rating = 1;
  comment = '';

  @Output() add = new EventEmitter<{ title: string; rating: number; comment: string }>();

  submit() {
    const trimmed = this.title.trim();
    if (!trimmed) {
      alert('A film címe kötelező!');
      return;
    }

    this.add.emit({
      title: trimmed,
      rating: this.rating,
      comment: this.comment.trim()
    });

    this.title = '';
    this.rating = 1;
    this.comment = '';
  }
}
