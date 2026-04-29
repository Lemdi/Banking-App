import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../../services/banking.service';
import { CurrencyNairaPipe } from '../../pipes/currency-naira.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyNairaPipe, LucideAngularModule],
  template: `
    <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight text-gradient">Transfer Money</h1>
        <p class="text-muted-foreground mt-2 text-lg">Send money seamlessly and securely.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Transfer Form -->
        <div class="glass rounded-2xl p-8 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-colors duration-500"></div>
          
          <h3 class="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <i-lucide name="send" class="text-primary"></i-lucide>
            New Transfer
          </h3>
          
          <form class="space-y-6 relative z-10">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-foreground/80 tracking-wide uppercase">From Account</label>
              <div class="relative">
                <select [(ngModel)]="fromAccount" name="fromAccount" class="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none shadow-sm">
                  <option *ngFor="let account of accounts" [value]="account.id" class="bg-card text-foreground">
                    {{ account.name }} - {{ account.balance | currencyNaira }}
                  </option>
                </select>
                <i-lucide name="credit-card" class="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size="18"></i-lucide>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-foreground/80 tracking-wide uppercase">To Account</label>
              <div class="relative">
                <select [(ngModel)]="toAccount" name="toAccount" class="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none shadow-sm">
                  <option *ngFor="let account of accounts" [value]="account.id" class="bg-card text-foreground">
                    {{ account.name }}
                  </option>
                </select>
                <i-lucide name="user" class="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size="18"></i-lucide>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-foreground/80 tracking-wide uppercase">Amount (₦)</label>
              <div class="relative">
                <input type="number" [(ngModel)]="amount" name="amount" placeholder="0.00" 
                  class="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background text-foreground text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm">
                <span class="absolute left-5 top-1/2 -translate-y-1/2 text-primary font-bold">₦</span>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-foreground/80 tracking-wide uppercase">Description</label>
              <div class="relative">
                <textarea [(ngModel)]="description" name="description" placeholder="What's this for?" rows="2"
                  class="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none shadow-sm"></textarea>
                <i-lucide name="message-square" class="absolute left-4 top-4 text-primary" size="18"></i-lucide>
              </div>
            </div>

            <div class="pt-2">
              <div class="glow-effect group">
                <button (click)="submitTransfer()" type="button" class="relative z-10 w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                  <span>Send Money</span>
                  <i-lucide name="arrow-right" size="18"></i-lucide>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Transfer Summary -->
        <div class="glass rounded-2xl p-8 flex flex-col relative overflow-hidden">
          <div class="absolute bottom-0 left-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10"></div>
          
          <h3 class="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <i-lucide name="file-text" class="text-accent"></i-lucide>
            Summary
          </h3>
          
          <div class="space-y-6 flex-1 flex flex-col">
            <div class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-secondary text-secondary-foreground">
                  <i-lucide name="arrow-up-right" size="18"></i-lucide>
                </div>
                <span class="text-muted-foreground font-medium">From</span>
              </div>
              <span class="font-bold text-foreground text-right truncate max-w-[150px]">{{ getAccountName(fromAccount) }}</span>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-secondary text-secondary-foreground">
                  <i-lucide name="arrow-down-left" size="18"></i-lucide>
                </div>
                <span class="text-muted-foreground font-medium">To</span>
              </div>
              <span class="font-bold text-foreground text-right truncate max-w-[150px]">{{ getAccountName(toAccount) }}</span>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
              <div class="flex items-center gap-3">
                <div class="p-2 rounded-lg bg-secondary text-secondary-foreground">
                  <i-lucide name="coins" size="18"></i-lucide>
                </div>
                <span class="text-muted-foreground font-medium">Fee</span>
              </div>
              <span class="font-bold text-green-500">Free</span>
            </div>

            <div class="mt-auto pt-6 border-t border-border/50 flex justify-between items-end">
              <span class="text-muted-foreground font-semibold uppercase tracking-wider text-sm">Total to Send</span>
              <span class="font-black text-4xl text-gradient">{{ amount | currencyNaira }}</span>
            </div>

            <div *ngIf="transferSuccess" class="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center z-20 rounded-2xl animate-in fade-in duration-300">
              <div class="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <i-lucide name="check" size="32" strokeWidth="3"></i-lucide>
              </div>
              <h4 class="text-xl font-bold text-foreground mb-2">Transfer Successful!</h4>
              <p class="text-muted-foreground">Your money is on its way.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TransferComponent implements OnInit {
  accounts: any[] = [];
  fromAccount = '';
  toAccount = '';
  amount = 0;
  description = '';
  transferSuccess = false;

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.accounts$.subscribe(accounts => {
      this.accounts = accounts;
      if (accounts.length > 0) {
        this.fromAccount = accounts[0].id;
        this.toAccount = accounts[1]?.id || accounts[0].id;
      }
    });
  }

  getAccountName(accountId: string): string {
    return this.accounts.find(acc => acc.id === accountId)?.name || 'Select account';
  }

  submitTransfer() {
    if (this.amount > 0 && this.fromAccount && this.toAccount) {
      this.bankingService.transferMoney(this.fromAccount, this.toAccount, this.amount);
      this.transferSuccess = true;
      this.amount = 0;
      this.description = '';
      setTimeout(() => this.transferSuccess = false, 3000);
    }
  }
}
