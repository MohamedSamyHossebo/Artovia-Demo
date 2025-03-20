import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeSwitchService {
  private darkModeSubject = new BehaviorSubject<boolean>(this.getSavedDarkMode());
  darkMode$ = this.darkModeSubject.asObservable();
  constructor() {
    this.applyDarkMode(this.darkModeSubject.value);
  }
  toggleDarkMode() {
    const newMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newMode);
    this.applyDarkMode(newMode);
    localStorage.setItem('darkMode', newMode ? 'enabled' : 'disabled');
  }

  private applyDarkMode(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private getSavedDarkMode(): boolean {
    return localStorage.getItem('darkMode') === 'enabled';
  }
}
