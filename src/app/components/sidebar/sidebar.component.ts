import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule, ThemeToggleComponent],
  template: `
    <nav class="w-full md:w-64 glass-sidebar text-sidebar-foreground p-6 overflow-y-auto flex flex-col h-full h-screen shadow-2xl">
      <!-- Premium Logo Section -->
      <div class="mb-10 px-2">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <!-- Stylized FH Logo -->
            <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="drop-shadow-sm shrink-0">
              <!-- Background F -->
              <path d="M20 15C20 12.2386 22.2386 10 25 10H80V25H35V45H70V60H35V90H20V15Z" fill="#001F3F" class="dark:fill-white"/>
              <!-- Overlapping H -->
              <path d="M55 10H70V45H90V10H105V90H90V60H70V90H55V10Z" fill="#007BFF" transform="translate(-15, 0)"/>
              <!-- Bank Icon integration -->
              <path d="M38 42L50 32L62 42V65H38V42Z" fill="#001F3F" class="dark:fill-background" stroke="white" stroke-width="2"/>
              <rect x="42" y="50" width="3" height="10" fill="white"/>
              <rect x="48.5" y="50" width="3" height="10" fill="white"/>
              <rect x="55" y="50" width="3" height="10" fill="white"/>
            </svg>
            <div class="flex flex-col">
              <span class="text-2xl font-black tracking-tighter leading-tight">
                <span class="text-[#001F3F] dark:text-white">Finance</span><span class="text-[#007BFF]">Hub</span>
              </span>
              <span class="text-[7px] font-bold tracking-[0.25em] text-muted-foreground uppercase opacity-90 whitespace-nowrap">
                Bank Smart. Live Better.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-2 flex-1">
        <a routerLink="/dashboard" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg" 
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="home" size="20"></i-lucide>
           </div>
          <span class="font-medium">Dashboard</span>
        </a>
        
        <a routerLink="/accounts" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="credit-card" size="20"></i-lucide>
           </div>
          <span class="font-medium">Accounts</span>
        </a>
        
        <a routerLink="/transactions" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="list" size="20"></i-lucide>
           </div>
          <span class="font-medium">Transactions</span>
        </a>
        
        <a routerLink="/transfer" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="send" size="20"></i-lucide>
           </div>
          <span class="font-medium">Transfer</span>
        </a>
        
        <a routerLink="/bills" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="file-text" size="20"></i-lucide>
           </div>
          <span class="font-medium">Bills</span>
        </a>
        
        <a routerLink="/cards" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="wallet" size="20"></i-lucide>
           </div>
          <span class="font-medium">Cards</span>
        </a>
        
        <a routerLink="/budget" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="pie-chart" size="20"></i-lucide>
           </div>
          <span class="font-medium">Budget</span>
        </a>
        
        <a routerLink="/settings" routerLinkActive="bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
           class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group">
           <div class="p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <i-lucide name="settings" size="20"></i-lucide>
           </div>
          <span class="font-medium">Settings</span>
        </a>
      </div>

      <div class="mt-auto pt-6 border-t border-sidebar-border flex items-center">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-secondary flex items-center justify-center border border-border overflow-hidden">
            <i-lucide name="user" size="20"></i-lucide>
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-medium">Alex Smith</p>
            <p class="text-xs text-muted-foreground">Pro Member</p>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class SidebarComponent {
}
