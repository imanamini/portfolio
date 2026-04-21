import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit } from '@angular/core';

const SPEAKER_NOTES: string[] = [];

@Component({
  selector: 'app-digipay-deck',
  standalone: true,
  templateUrl: './digipay-deck.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DigipayDeckComponent implements OnInit, OnDestroy {
  private injected: HTMLElement[] = [];

  ngOnInit(): void {
    this.addLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    this.addLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' });
    this.addLink({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
    });
    this.addLink({ rel: 'stylesheet', href: '/decks/digipay-libs/styles.css' });

    const notes = document.createElement('script');
    notes.type = 'application/json';
    notes.id = 'speaker-notes';
    notes.textContent = JSON.stringify(SPEAKER_NOTES);
    document.body.appendChild(notes);
    this.injected.push(notes);

    const script = document.createElement('script');
    script.src = '/decks/digipay-libs/deck-stage.js';
    script.defer = true;
    document.body.appendChild(script);
    this.injected.push(script);
  }

  ngOnDestroy(): void {
    this.injected.forEach(el => el.remove());
    this.injected = [];
  }

  private addLink(attrs: Record<string, string>): void {
    const el = document.createElement('link');
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
    this.injected.push(el);
  }
}
