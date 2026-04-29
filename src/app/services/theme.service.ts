import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<Theme>('dark');

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      this.setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  setTheme(theme: Theme) {
    this.themeSignal.set(theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme() {
    this.setTheme(this.themeSignal() === 'dark' ? 'light' : 'dark');
  }
}
