import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div 
      (click)="themeService.toggleTheme()" 
      class="group relative w-14 h-7 rounded-full cursor-pointer transition-all duration-500 border border-sidebar-border/50 shadow-inner overflow-hidden"
      [ngClass]="themeService.themeSignal() === 'dark' ? 'bg-primary/20' : 'bg-muted'"
    >
      <!-- Sliding Track Background -->
      <div 
        class="absolute inset-0 transition-opacity duration-500 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0"
        [ngClass]="{ 'opacity-100': themeService.themeSignal() === 'light' }"
      ></div>

      <!-- Toggle Knob -->
      <div 
        class="absolute top-1 left-1 w-5 h-5 rounded-full shadow-lg transition-all duration-500 flex items-center justify-center z-10"
        [ngClass]="themeService.themeSignal() === 'dark' ? 'translate-x-7 bg-primary shadow-primary/50' : 'translate-x-0 bg-white shadow-orange-200'"
      >
        <i-lucide 
          [name]="themeService.themeSignal() === 'dark' ? 'moon' : 'sun'" 
          size="12" 
          [class]="themeService.themeSignal() === 'dark' ? 'text-white' : 'text-orange-500'"
          class="transition-transform duration-500"
          [ngStyle]="{ 'transform': 'rotate(' + (themeService.themeSignal() === 'dark' ? '0' : '360') + 'deg)' }"
        ></i-lucide>
      </div>

      <!-- Inner Labels/Icons -->
      <div class="absolute inset-0 flex items-center justify-between px-2 text-[10px] pointer-events-none">
        <i-lucide name="sun" size="10" class="text-orange-400 opacity-40" [ngClass]="{ 'opacity-0': themeService.themeSignal() === 'light' }"></i-lucide>
        <i-lucide name="moon" size="10" class="text-primary opacity-40" [ngClass]="{ 'opacity-0': themeService.themeSignal() === 'dark' }"></i-lucide>
      </div>
    </div>
  `,
  styles: []
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
