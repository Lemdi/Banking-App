import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../../services/banking.service';
import { CurrencyNairaPipe } from '../../pipes/currency-naira.pipe';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, CurrencyNairaPipe, LucideAngularModule],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Budget & Insights</h1>
        <p class="text-muted-foreground mt-2">Track your spending and manage budgets.</p>
      </div>

      <!-- Budget Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Total Budget</p>
          <p class="text-2xl font-bold text-foreground">{{ getTotalBudget() | currencyNaira }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Total Spent</p>
          <p class="text-2xl font-bold text-destructive">{{ getTotalSpent() | currencyNaira }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Remaining</p>
          <p class="text-2xl font-bold text-accent">{{ getRemainingBudget() | currencyNaira }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Usage</p>
          <p class="text-2xl font-bold text-primary">{{ getUsagePercentage() }}%</p>
        </div>
      </div>

      <!-- Budget Categories -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold text-foreground">Budget by Category</h3>
        
        <div *ngFor="let budget of budgets" class="bg-card border border-border rounded-lg p-6">
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-semibold text-foreground">{{ budget.category }}</h4>
            <div class="text-right">
              <p class="font-semibold text-foreground">{{ budget.spent | currencyNaira }} / {{ budget.limit | currencyNaira }}</p>
              <p [ngClass]="{
                'text-destructive': getProgressPercentage(budget) > 80,
                'text-accent': getProgressPercentage(budget) <= 80
              }" class="text-sm font-medium">
                {{ getProgressPercentage(budget) }}%
              </p>
            </div>
          </div>

          <div class="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div [style.width.%]="getProgressPercentage(budget)"
              [ngClass]="{
                'bg-destructive': getProgressPercentage(budget) > 80,
                'bg-accent': getProgressPercentage(budget) > 50 && getProgressPercentage(budget) <= 80,
                'bg-primary': getProgressPercentage(budget) <= 50
              }"
              class="h-full transition-all duration-300"></div>
          </div>

          <div class="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>Remaining: {{ getRemainingInCategory(budget) | currencyNaira }}</span>
            <span>{{ (budget.spent / budget.limit * 100).toFixed(1) }}% used</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BudgetComponent implements OnInit {
  budgets: any[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.budgets$.subscribe(budgets => {
      this.budgets = budgets;
    });
  }

  getTotalBudget(): number {
    return this.budgets.reduce((sum, b) => sum + b.limit, 0);
  }

  getTotalSpent(): number {
    return this.budgets.reduce((sum, b) => sum + b.spent, 0);
  }

  getRemainingBudget(): number {
    return this.getTotalBudget() - this.getTotalSpent();
  }

  getUsagePercentage(): number {
    const total = this.getTotalBudget();
    return total > 0 ? Math.round((this.getTotalSpent() / total) * 100) : 0;
  }

  getProgressPercentage(budget: any): number {
    return Math.round((budget.spent / budget.limit) * 100);
  }

  getRemainingInCategory(budget: any): number {
    return Math.max(0, budget.limit - budget.spent);
  }
}
