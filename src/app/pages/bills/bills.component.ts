import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../../services/banking.service';
import { CurrencyNairaPipe } from '../../pipes/currency-naira.pipe';
import { LucideAngularModule } from 'lucide-angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, CurrencyNairaPipe, LucideAngularModule, DatePipe],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Bills</h1>
        <p class="text-muted-foreground mt-2">Track and manage your upcoming bills.</p>
      </div>

      <!-- Bills Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Total Bills</p>
          <p class="text-2xl font-bold text-foreground">{{ (bills | slice:0:1).length }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Pending</p>
          <p class="text-2xl font-bold text-destructive">{{ getPendingCount() }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Paid</p>
          <p class="text-2xl font-bold text-accent">{{ getPaidCount() }}</p>
        </div>
        <div class="bg-card border border-border rounded-lg p-4">
          <p class="text-sm text-muted-foreground">Total Amount</p>
          <p class="text-2xl font-bold text-foreground">{{ getTotalAmount() | currencyNaira }}</p>
        </div>
      </div>

      <!-- Bills List -->
      <div class="bg-card border border-border rounded-lg overflow-hidden">
        <div class="p-6 border-b border-border">
          <h3 class="font-semibold text-foreground">Your Bills</h3>
        </div>

        <div class="divide-y divide-border">
          <div *ngFor="let bill of bills" class="p-6 flex justify-between items-center hover:bg-secondary/20 transition-colors">
            <div class="flex items-center gap-4 flex-1">
              <div [ngClass]="{
                'bg-destructive/10 text-destructive': !bill.isPaid,
                'bg-accent/10 text-accent': bill.isPaid
              }" class="p-3 rounded-lg">
                <i-lucide [name]="bill.isPaid ? 'check-circle' : 'alert-circle'" size="20"></i-lucide>
              </div>

              <div class="flex-1">
                <p class="font-semibold text-foreground">{{ bill.name }}</p>
                <div class="flex gap-4 mt-1">
                  <span class="text-sm text-muted-foreground">{{ bill.category }}</span>
                  <span class="text-sm text-muted-foreground">Due: {{ bill.dueDate | date:'short' }}</span>
                </div>
              </div>
            </div>

            <div class="text-right mr-4">
              <p class="font-semibold text-foreground">{{ bill.amount | currencyNaira }}</p>
              <span [ngClass]="{
                'text-destructive': !bill.isPaid,
                'text-accent': bill.isPaid
              }" class="text-sm font-medium">
                {{ bill.isPaid ? 'Paid' : 'Pending' }}
              </span>
            </div>

            <button *ngIf="!bill.isPaid" (click)="payBill(bill.id)" class="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Pay Now
            </button>
            <span *ngIf="bill.isPaid" class="text-accent font-semibold">✓ Paid</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BillsComponent implements OnInit {
  bills: any[] = [];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.bills$.subscribe(bills => {
      this.bills = bills;
    });
  }

  getPendingCount(): number {
    return this.bills.filter(b => !b.isPaid).length;
  }

  getPaidCount(): number {
    return this.bills.filter(b => b.isPaid).length;
  }

  getTotalAmount(): number {
    return this.bills.reduce((sum, b) => sum + b.amount, 0);
  }

  payBill(billId: string) {
    this.bankingService.payBill(billId);
  }
}
