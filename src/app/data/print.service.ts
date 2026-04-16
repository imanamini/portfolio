import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PrintService {
  private clickCount = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;

  registerNameClick(callback: () => void): void {
    this.clickCount++;

    if (this.timer) clearTimeout(this.timer);

    if (this.clickCount >= 5) {
      this.clickCount = 0;
      callback();
      return;
    }

    this.timer = setTimeout(() => {
      this.clickCount = 0;
    }, 2000);
  }

  printAsPdf(filename = 'Iman Amini Resume'): void {
    const prev = document.title;
    document.title = filename;
    window.print();
    setTimeout(() => (document.title = prev), 1000);
  }
}
