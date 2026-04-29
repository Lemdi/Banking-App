-- Banking App Database Schema

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Accounts table
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  account_number TEXT UNIQUE NOT NULL,
  account_type TEXT NOT NULL, -- 'checking', 'savings'
  balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
  currency TEXT DEFAULT 'USD',
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cards table
CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE,
  card_type TEXT NOT NULL, -- 'debit', 'credit'
  card_number TEXT UNIQUE NOT NULL,
  cardholder_name TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL, -- 'transfer', 'deposit', 'withdrawal', 'purchase', 'bill_payment'
  amount DECIMAL(15, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  description TEXT,
  recipient_name TEXT,
  recipient_account TEXT,
  status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transfers table
CREATE TABLE IF NOT EXISTS public.transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  to_account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2) NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bills table
CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  biller_name TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'overdue'
  category TEXT, -- 'utility', 'insurance', 'subscription', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Budgets table
CREATE TABLE IF NOT EXISTS public.budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  budget_amount DECIMAL(15, 2) NOT NULL,
  spent_amount DECIMAL(15, 2) DEFAULT 0.00,
  period TEXT DEFAULT 'monthly', -- 'weekly', 'monthly', 'yearly'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON public.accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON public.cards(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON public.transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transfers_from_account ON public.transfers(from_account_id);
CREATE INDEX IF NOT EXISTS idx_transfers_to_account ON public.transfers(to_account_id);
CREATE INDEX IF NOT EXISTS idx_bills_account_id ON public.bills(account_id);
CREATE INDEX IF NOT EXISTS idx_budgets_user_id ON public.budgets(user_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for accounts table
CREATE POLICY "Users can view their own accounts"
  ON public.accounts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own accounts"
  ON public.accounts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts"
  ON public.accounts FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for cards table
CREATE POLICY "Users can view their own cards"
  ON public.cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cards"
  ON public.cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards"
  ON public.cards FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for transactions table
CREATE POLICY "Users can view their account transactions"
  ON public.transactions FOR SELECT
  USING (
    account_id IN (
      SELECT id FROM public.accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert transactions to their accounts"
  ON public.transactions FOR INSERT
  WITH CHECK (
    account_id IN (
      SELECT id FROM public.accounts WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for transfers table
CREATE POLICY "Users can view their transfers"
  ON public.transfers FOR SELECT
  USING (
    from_account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid()) OR
    to_account_id IN (SELECT id FROM public.accounts WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert transfers from their accounts"
  ON public.transfers FOR INSERT
  WITH CHECK (
    from_account_id IN (
      SELECT id FROM public.accounts WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for bills table
CREATE POLICY "Users can view their bills"
  ON public.bills FOR SELECT
  USING (
    account_id IN (
      SELECT id FROM public.accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their bills"
  ON public.bills FOR INSERT
  WITH CHECK (
    account_id IN (
      SELECT id FROM public.accounts WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their bills"
  ON public.bills FOR UPDATE
  USING (
    account_id IN (
      SELECT id FROM public.accounts WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for budgets table
CREATE POLICY "Users can view their budgets"
  ON public.budgets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their budgets"
  ON public.budgets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their budgets"
  ON public.budgets FOR UPDATE
  USING (auth.uid() = user_id);
