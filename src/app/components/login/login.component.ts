import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';

  @Output() login = new EventEmitter<string>();

  submit() {
    const trimmed = this.username.trim();
    if (!trimmed) {
      alert('Kérlek, add meg a neved!');
      return;
    }

    localStorage.setItem('username', trimmed);
    this.login.emit(trimmed);
  }
}
