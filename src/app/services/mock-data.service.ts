import { Injectable } from '@angular/core';

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  category: string;
  date: Date;
  merchant?: string;
}

export interface Card {
  id: string;
  type: 'debit' | 'credit';
  cardNumber: string;
  expiryDate: string;
  name: string;
  isActive: boolean;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  category: string;
  isPaid: boolean;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  month: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getAccounts(): Account[] {
    return [
      { id: '1', name: 'Checking Account', type: 'checking', balance: 250500, accountNumber: '1234567890' },
      { id: '2', name: 'Savings Account', type: 'savings', balance: 1500000, accountNumber: '0987654321' },
      { id: '3', name: 'Investment Account', type: 'investment', balance: 850000, accountNumber: '1122334455' },
    ];
  }

  getTransactions(): Transaction[] {
    const today = new Date();
    return [
      { id: '1', accountId: '1', type: 'debit', amount: 25000, description: 'Coffee Shop', category: 'Food & Dining', date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), merchant: 'Brew Haven' },
      { id: '2', accountId: '1', type: 'credit', amount: 150000, description: 'Salary', category: 'Income', date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000) },
      { id: '3', accountId: '1', type: 'debit', amount: 5500, description: 'Uber', category: 'Transportation', date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), merchant: 'Uber' },
      { id: '4', accountId: '2', type: 'debit', amount: 45000, description: 'Restaurant', category: 'Food & Dining', date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), merchant: 'Tantalizers' },
      { id: '5', accountId: '1', type: 'debit', amount: 12000, description: 'Electricity Bill', category: 'Utilities', date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000) },
      { id: '6', accountId: '3', type: 'credit', amount: 50000, description: 'Dividend Payment', category: 'Investment', date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000) },
    ];
  }

  getCards(): Card[] {
    return [
      { id: '1', type: 'debit', cardNumber: '****5678', expiryDate: '12/26', name: 'Verve Debit Card', isActive: true },
      { id: '2', type: 'credit', cardNumber: '****9012', expiryDate: '08/25', name: 'Mastercard', isActive: true },
    ];
  }

  getBills(): Bill[] {
    const today = new Date();
    return [
      { id: '1', name: 'Electricity Bill', amount: 12000, dueDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), category: 'Utilities', isPaid: false },
      { id: '2', name: 'Internet Bill', amount: 5500, dueDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), category: 'Utilities', isPaid: false },
      { id: '3', name: 'Insurance', amount: 25000, dueDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), category: 'Insurance', isPaid: false },
      { id: '4', name: 'Gym Membership', amount: 3500, dueDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000), category: 'Health', isPaid: true },
    ];
  }

  getBudgets(): Budget[] {
    return [
      { id: '1', category: 'Food & Dining', limit: 100000, spent: 75000, month: 'April 2026' },
      { id: '2', category: 'Transportation', limit: 50000, spent: 28500, month: 'April 2026' },
      { id: '3', category: 'Entertainment', limit: 30000, spent: 15000, month: 'April 2026' },
      { id: '4', category: 'Shopping', limit: 80000, spent: 65000, month: 'April 2026' },
      { id: '5', category: 'Utilities', limit: 25000, spent: 18500, month: 'April 2026' },
    ];
  }

  getSpendingByCategory() {
    return [
      { name: 'Food & Dining', value: 75000 },
      { name: 'Transportation', value: 28500 },
      { name: 'Entertainment', value: 15000 },
      { name: 'Shopping', value: 65000 },
      { name: 'Utilities', value: 18500 },
    ];
  }

  getSavingsGrowth() {
    return [
      { month: 'Jan', amount: 1200000 },
      { month: 'Feb', amount: 1350000 },
      { month: 'Mar', amount: 1420000 },
      { month: 'Apr', amount: 1500000 },
    ];
  }
}
