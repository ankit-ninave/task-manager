import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  lFN_ToggleTheme() {
    document.documentElement.classList.toggle('dark');

    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  lFN_IsDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }
}