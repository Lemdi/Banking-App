import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../../services/banking.service';
import { CurrencyNairaPipe } from '../../pipes/currency-naira.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, CurrencyNairaPipe, LucideAngularModule, DatePipe],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Transactions</h1>
        <p class="text-muted-foreground mt-2">View and manage all your transactions.</p>
      </div>

      <div class="bg-card border border-border rounded-lg overflow-hidden">
        <div class="p-6 border-b border-border">
          <h3 class="font-semibold text-foreground">All Transactions</h3>
        </div>
        
        <div class="divide-y divide-border">
          <div *ngFor="let transaction of transactions" class="p-6 hover:bg-secondary/20 transition-colors flex justify-between items-center">
            <div class="flex items-center gap-4 flex-1">
              <div [ngClass]="{
                'bg-destructive/10 text-destructive': transaction.type === 'debit',
                'bg-accent/10 text-accent': transaction.type === 'credit'
              }" class="p-3 rounded-lg">
                <i-lucide [name]="transaction.type === 'debit' ? 'arrow-down' : 'arrow-up'" size="20"></i-lucide>
              </div>
              
              <div class="flex-1">
                <p class="font-semibold text-foreground">{{ transaction.description }}</p>
                <p class="text-sm text-muted-foreground">{{ transaction.category }} • {{ transaction.date | date:'short' }}</p>
              </div>
            </div>

            <div class="text-right">
              <p [ngClass]="{
                'text-destructive': transaction.type === 'debit',
                'text-accent': transaction.type === 'credit'
              }" class="font-semibold">
                {{ transaction.type === 'debit' ? '-' : '+' }}{{ transaction.amount | currencyNaira }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.transactions$.subscribe(transactions => {
      this.transactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
  }
}
