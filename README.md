# 🏦 FinanceHub Premium

![FinanceHub Banner](public/banner.png)

[![Angular](https://img.shields.io/badge/Angular-18-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-FFB11B?style=for-the-badge&logo=lucide)](https://lucide.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

FinanceHub Premium is a state-of-the-art, glassmorphic banking dashboard designed for modern financial management. Built with Angular 18 and powered by Tailwind CSS, it offers a seamless, high-performance experience with a stunning premium aesthetic.

---

## ✨ Key Features

- **📊 Comprehensive Dashboard**: At-a-glance view of your accounts, recent transactions, and budget status.
- **💸 Smart Transfers**: Intuitive interface for quick and secure fund transfers between accounts.
- **📑 Detailed Transactions**: Full history with categorization and advanced filtering.
- **💰 Budget Management**: Track your spending and stay on top of your financial goals.
- **🌓 Dynamic Theme System**: Seamlessly switch between polished Dark and Light modes with glassmorphic effects.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile screens.

## 🛠️ Tech Stack

- **Framework**: [Angular 18](https://angular.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Angular](https://lucide.dev/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **State Management**: Reactive RxJS streams
- **UI Design**: Modern Glassmorphism & Micro-animations

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lemdi/Banking-App.git
   cd Banking-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` or update your `environment.ts` with your Supabase credentials:
   ```typescript
   export const environment = {
     supabaseUrl: 'YOUR_SUPABASE_URL',
     supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🏗️ Project Structure

```text
src/
├── app/
│   ├── components/      # Reusable UI components (Sidebar, Cards, etc.)
│   ├── pages/           # Main page components (Dashboard, Transfers, etc.)
│   ├── services/        # Data services and Supabase integration
│   └── shared/          # Interfaces, constants, and utilities
├── assets/              # Static assets and images
└── styles.css           # Global styles and Tailwind imports
```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for the next generation of FinTech.
</p>
