import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor-trail',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styleUrls: ['./cursor-trail.component.scss']
})
export class CursorTrailComponent implements OnInit {

colors = ['#2d004d', '#4b0082', '#6a0dad', '#a259ff', '#c8a2ff', '#e5dbff', '#ffffff'];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    document.addEventListener('mousemove', (e) => {
      const circle = this.renderer.createElement('div');
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.renderer.setStyle(circle, 'position', 'fixed');
      this.renderer.setStyle(circle, 'top', `${e.clientY}px`);
      this.renderer.setStyle(circle, 'left', `${e.clientX}px`);
      this.renderer.setStyle(circle, 'width', '10px');
      this.renderer.setStyle(circle, 'height', '10px');
      this.renderer.setStyle(circle, 'borderRadius', '50%');
      this.renderer.setStyle(circle, 'backgroundColor', color);
      this.renderer.setStyle(circle, 'pointerEvents', 'none');
      this.renderer.setStyle(circle, 'zIndex', '9999');
      this.renderer.setStyle(circle, 'opacity', '0.8');
      this.renderer.setStyle(circle, 'transition', 'transform 0.4s ease, opacity 0.6s ease');

      this.renderer.appendChild(document.body, circle);

      requestAnimationFrame(() => {
        this.renderer.setStyle(circle, 'transform', 'scale(2)');
        this.renderer.setStyle(circle, 'opacity', '0');
      });

      setTimeout(() => {
        this.renderer.removeChild(document.body, circle);
      }, 600);
    });
  }
}
