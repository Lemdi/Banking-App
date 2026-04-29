import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../../services/banking.service';
import { CurrencyNairaPipe } from '../../pipes/currency-naira.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, CurrencyNairaPipe, LucideAngularModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Accounts</h1>
        <p class="text-muted-foreground mt-2">Manage all your accounts in one place.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let account of accounts" class="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-6">
            <div>
              <p class="text-sm text-muted-foreground">{{ account.name }}</p>
              <p class="text-2xl font-bold text-foreground mt-1">{{ account.balance | currencyNaira }}</p>
            </div>
            <div [ngClass]="{
              'bg-primary/10 text-primary': account.type === 'checking',
              'bg-accent/10 text-accent': account.type === 'savings',
              'bg-chart-3/10 text-chart-3': account.type === 'investment'
            }" class="p-3 rounded-lg">
              <i-lucide [name]="
                account.type === 'checking' ? 'credit-card' :
                account.type === 'savings' ? 'piggy-bank' :
                'trending-up'
              " size="24"></i-lucide>
            </div>
          </div>

          <div class="space-y-4 border-t border-border pt-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Account Number</span>
              <span class="font-mono text-sm text-foreground">{{ account.accountNumber }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-muted-foreground">Account Type</span>
              <span class="text-sm font-semibold text-foreground capitalize">{{ account.type }}</span>
            </div>
          </div>

          <button class="w-full mt-6 bg-primary text-primary-foreground rounded-lg py-2 hover:bg-primary/90 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
    });
  }
}
