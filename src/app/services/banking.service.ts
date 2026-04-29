import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MockDataService, Account, Transaction, Card, Bill, Budget } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private accountsSubject = new BehaviorSubject<Account[]>([]);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  private billsSubject = new BehaviorSubject<Bill[]>([]);
  private budgetsSubject = new BehaviorSubject<Budget[]>([]);

  accounts$ = this.accountsSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();
  cards$ = this.cardsSubject.asObservable();
  bills$ = this.billsSubject.asObservable();
  budgets$ = this.budgetsSubject.asObservable();

  constructor(private mockDataService: MockDataService) {
    this.loadData();
  }

  private loadData() {
    this.accountsSubject.next(this.mockDataService.getAccounts());
    this.transactionsSubject.next(this.mockDataService.getTransactions());
    this.cardsSubject.next(this.mockDataService.getCards());
    this.billsSubject.next(this.mockDataService.getBills());
    this.budgetsSubject.next(this.mockDataService.getBudgets());
  }

  getTotalBalance(): number {
    return this.mockDataService.getAccounts().reduce((sum, acc) => sum + acc.balance, 0);
  }

  getSpendingByCategory() {
    return this.mockDataService.getSpendingByCategory();
  }

  getSavingsGrowth() {
    return this.mockDataService.getSavingsGrowth();
  }

  transferMoney(fromAccountId: string, toAccountId: string, amount: number): boolean {
    // Mock implementation
    return true;
  }

  payBill(billId: string): boolean {
    const bills = this.billsSubject.value;
    const bill = bills.find(b => b.id === billId);
    if (bill) {
      bill.isPaid = true;
      this.billsSubject.next([...bills]);
      return true;
    }
    return false;
  }
}
