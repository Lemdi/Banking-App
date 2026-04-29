import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { BillsComponent } from './pages/bills/bills.component';
import { CardsComponent } from './pages/cards/cards.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'settings', component: SettingsComponent },
];
