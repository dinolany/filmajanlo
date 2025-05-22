import { Component, OnInit, Renderer2, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snowfall',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class SnowfallComponent implements OnInit {

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => this.createStar(), 150); // gyorsabb hullás
    });
  }

  createStar(): void {
    const star = this.renderer.createElement('div');

    const size = Math.floor(Math.random() * 20) + 16; // 16–36px
    const startLeft = Math.random() * window.innerWidth;
    const duration = Math.random() * 10 + 1.5; // 1.5–3.5 sec

    const rotation = Math.floor(Math.random() * 360); // csak forgatás

    // Alap stílusok
    this.renderer.setStyle(star, 'position', 'fixed');
    this.renderer.setStyle(star, 'top', '-40px');
    this.renderer.setStyle(star, 'left', `${startLeft}px`);
    this.renderer.setStyle(star, 'width', `${size}px`);
    this.renderer.setStyle(star, 'height', `${size}px`);
    this.renderer.setStyle(star, 'backgroundImage', 'url("assets/star.gif")');
    this.renderer.setStyle(star, 'backgroundSize', 'contain');
    this.renderer.setStyle(star, 'backgroundRepeat', 'no-repeat');
    this.renderer.setStyle(star, 'backgroundPosition', 'center');
    this.renderer.setStyle(star, 'pointerEvents', 'none');
    this.renderer.setStyle(star, 'zIndex', '9999');
    this.renderer.setStyle(star, 'opacity', '1');
    this.renderer.setStyle(star, 'transition', `transform ${duration}s linear, opacity ${duration}s ease`);

    this.renderer.appendChild(document.body, star);

    // Animáció: esés + forgás (nincs scaleX)
    requestAnimationFrame(() => {
      const drift = (Math.random() - 0.5) * 100; // oldalirányú sodródás
      const transform = `translate(${drift}px, ${window.innerHeight + 100}px) rotateZ(${rotation}deg)`;
      this.renderer.setStyle(star, 'transform', transform);
      this.renderer.setStyle(star, 'opacity', '0');
    });

    setTimeout(() => {
      this.renderer.removeChild(document.body, star);
    }, duration * 1000);
  }
}
