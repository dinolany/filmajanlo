import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-click-firework',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class ClickFireworkComponent implements OnInit {

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('click', (e: MouseEvent) => {
        const colors = ['#2d004d', '#4b0082', '#6a0dad', '#a259ff', '#c8a2ff', '#e5dbff', '#ffffff'];

        for (let i = 0; i < 12; i++) {
          const particle = this.renderer.createElement('div');
          const color = colors[Math.floor(Math.random() * colors.length)];
          const angle = (Math.PI * 2 * i) / 12;
          const radius = 60;

          const x = e.clientX;
          const y = e.clientY;

          this.renderer.setStyle(particle, 'position', 'fixed');
          this.renderer.setStyle(particle, 'top', `${y}px`);
          this.renderer.setStyle(particle, 'left', `${x}px`);
          this.renderer.setStyle(particle, 'width', '8px');
          this.renderer.setStyle(particle, 'height', '8px');
          this.renderer.setStyle(particle, 'borderRadius', '50%');
          this.renderer.setStyle(particle, 'backgroundColor', color);
          this.renderer.setStyle(particle, 'zIndex', '9999');
          this.renderer.setStyle(particle, 'pointerEvents', 'none');
          this.renderer.setStyle(particle, 'transition', 'transform 0.5s ease-out, opacity 0.5s ease-out');

          this.renderer.appendChild(document.body, particle);

          requestAnimationFrame(() => {
            const dx = Math.cos(angle) * radius;
            const dy = Math.sin(angle) * radius;
            this.renderer.setStyle(particle, 'transform', `translate(${dx}px, ${dy}px) scale(0.8)`);
            this.renderer.setStyle(particle, 'opacity', '0');
          });

          setTimeout(() => {
            this.renderer.removeChild(document.body, particle);
          }, 600);
        }
      });
    });
  }
}
