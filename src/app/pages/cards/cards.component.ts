import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../../services/banking.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Cards</h1>
        <p class="text-muted-foreground mt-2">Manage your debit and credit cards.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div *ngFor="let card of cards" [ngClass]="{
          'bg-gradient-to-br from-blue-600 to-blue-700': card.type === 'debit',
          'bg-gradient-to-br from-purple-600 to-purple-700': card.type === 'credit'
        }" class="text-white rounded-lg p-8 h-64 relative overflow-hidden shadow-lg">
          
          <!-- Decorative background -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p class="text-xs opacity-75 uppercase tracking-widest">{{ card.type === 'debit' ? 'Debit Card' : 'Credit Card' }}</p>
              <p class="font-semibold mt-2">{{ card.name }}</p>
            </div>

            <div>
              <p class="text-2xl font-mono tracking-widest mb-4">{{ card.cardNumber }}</p>
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-xs opacity-75">VALID THRU</p>
                  <p class="font-mono">{{ card.expiryDate }}</p>
                </div>
                <div [ngClass]="{
                  'bg-blue-500': card.type === 'debit',
                  'bg-purple-500': card.type === 'credit'
                }" class="text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  {{ card.isActive ? 'Active' : 'Inactive' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Actions -->
      <div class="bg-card border border-border rounded-lg p-8">
        <h3 class="text-xl font-semibold text-foreground mb-6">Card Actions</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button class="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
            <i-lucide name="plus" size="20" class="text-primary"></i-lucide>
            <span class="font-semibold text-foreground">Request Card</span>
          </button>
          
          <button class="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
            <i-lucide name="lock" size="20" class="text-primary"></i-lucide>
            <span class="font-semibold text-foreground">Lock Card</span>
          </button>
          
          <button class="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
            <i-lucide name="eye" size="20" class="text-primary"></i-lucide>
            <span class="font-semibold text-foreground">View Pin</span>
          </button>
          
          <button class="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
            <i-lucide name="settings" size="20" class="text-primary"></i-lucide>
            <span class="font-semibold text-foreground">Settings</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CardsComponent implements OnInit {
  cards: any[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.cards$.subscribe(cards => {
      this.cards = cards;
    });
  }
}
