import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="min-h-screen w-full flex flex-col md:flex-row bg-background relative z-0">
      <!-- Ambient Background Glow -->
      <div class="absolute top-0 left-1/4 w-3/4 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>
      <div class="absolute bottom-0 right-1/4 w-1/2 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>
      
      <div class="w-full md:w-64 flex-shrink-0 z-10">
        <app-sidebar></app-sidebar>
      </div>
      <main class="flex-1 min-w-0 overflow-auto bg-transparent z-10">
        <div class="p-6 md:p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'FinanceHub';
}
