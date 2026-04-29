import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ThemeToggleComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-4xl font-bold text-foreground">Settings</h1>
        <p class="text-muted-foreground mt-2">Manage your account preferences and security.</p>
      </div>

      <!-- Profile Settings -->
      <div class="bg-card border border-border rounded-lg p-8">
        <h3 class="text-xl font-semibold text-foreground mb-6">Profile Information</h3>
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-foreground mb-2">First Name</label>
              <input type="text" [(ngModel)]="firstName" placeholder="John" 
                class="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
            <div>
              <label class="block text-sm font-semibold text-foreground mb-2">Last Name</label>
              <input type="text" [(ngModel)]="lastName" placeholder="Doe"
                class="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-foreground mb-2">Email Address</label>
            <input type="email" [(ngModel)]="email" placeholder="john@example.com"
              class="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <div>
            <label class="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
            <input type="tel" [(ngModel)]="phone" placeholder="+234 901 234 5678"
              class="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
          </div>

          <button class="bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="bg-card border border-border rounded-lg p-8">
        <h3 class="text-xl font-semibold text-foreground mb-6">Security</h3>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center p-4 border border-border rounded-lg">
            <div class="flex items-center gap-3">
              <i-lucide name="lock" size="20" class="text-primary"></i-lucide>
              <div>
                <p class="font-semibold text-foreground">Password</p>
                <p class="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
            </div>
            <button class="text-primary font-semibold hover:underline">Change</button>
          </div>

          <div class="flex justify-between items-center p-4 border border-border rounded-lg">
            <div class="flex items-center gap-3">
              <i-lucide name="smartphone" size="20" class="text-primary"></i-lucide>
              <div>
                <p class="font-semibold text-foreground">Two-Factor Authentication</p>
                <p class="text-sm text-muted-foreground">Enhance account security</p>
              </div>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="twoFactorEnabled" class="w-5 h-5">
            </label>
          </div>

          <div class="flex justify-between items-center p-4 border border-border rounded-lg">
            <div class="flex items-center gap-3">
              <i-lucide name="eye" size="20" class="text-primary"></i-lucide>
              <div>
                <p class="font-semibold text-foreground">Login Alerts</p>
                <p class="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="loginAlertsEnabled" [checked]="true" class="w-5 h-5">
            </label>
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-card border border-border rounded-lg p-8">
        <h3 class="text-xl font-semibold text-foreground mb-6">Notifications</h3>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="font-semibold text-foreground">Email Notifications</p>
              <p class="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="emailNotifications" [checked]="true" class="w-5 h-5">
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <p class="font-semibold text-foreground">SMS Notifications</p>
              <p class="text-sm text-muted-foreground">Get text message alerts</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="smsNotifications" [checked]="true" class="w-5 h-5">
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <p class="font-semibold text-foreground">Push Notifications</p>
              <p class="text-sm text-muted-foreground">Receive app notifications</p>
            </div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" [(ngModel)]="pushNotifications" class="w-5 h-5">
            </label>
          </div>
        </div>
      </div>

      <!-- Preferences -->
      <div class="bg-card border border-border rounded-lg p-8">
        <h3 class="text-xl font-semibold text-foreground mb-6">Preferences</h3>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center p-4 border border-border rounded-lg bg-background/50">
            <div>
              <p class="font-semibold text-foreground">Application Theme</p>
              <p class="text-sm text-muted-foreground">Switch between light and dark modes</p>
            </div>
            <app-theme-toggle></app-theme-toggle>
          </div>

          <div>
            <label class="block text-sm font-semibold text-foreground mb-2">Currency</label>
            <select [(ngModel)]="currency" class="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="naira">Nigerian Naira (₦)</option>
              <option value="usd">US Dollar ($)</option>
              <option value="gbp">British Pound (£)</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-foreground mb-2">Language</label>
            <select [(ngModel)]="language" class="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <button class="bg-primary text-primary-foreground font-semibold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-card border-2 border-destructive rounded-lg p-8">
        <h3 class="text-xl font-semibold text-destructive mb-6">Danger Zone</h3>
        
        <div class="space-y-4">
          <button class="w-full border border-destructive text-destructive font-semibold py-2 px-6 rounded-lg hover:bg-destructive/10 transition-colors">
            Logout from All Devices
          </button>
          <button class="w-full bg-destructive text-destructive-foreground font-semibold py-2 px-6 rounded-lg hover:bg-destructive/90 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent {
  firstName = 'John';
  lastName = 'Doe';
  email = 'john.doe@example.com';
  phone = '+234 901 234 5678';
  
  twoFactorEnabled = false;
  loginAlertsEnabled = true;
  emailNotifications = true;
  smsNotifications = true;
  pushNotifications = false;
  
  theme = 'auto';
  currency = 'naira';
  language = 'en';
}
