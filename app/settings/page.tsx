'use client'

import { mockUser } from '@/lib/mock-data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone, MapPin, Bell, Lock, Eye, DollarSign } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Profile Information</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              {mockUser.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold">{mockUser.full_name}</h3>
              <p className="text-sm text-muted-foreground">{mockUser.email}</p>
              <Button size="sm" variant="outline" className="mt-2">
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input defaultValue={mockUser.full_name} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input defaultValue={mockUser.email} type="email" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input defaultValue={mockUser.phone} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Input defaultValue={mockUser.country} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <Input defaultValue={mockUser.address} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input defaultValue={mockUser.city} />
            </div>
          </div>

          <Button className="w-full">Save Changes</Button>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">Last changed 60 days ago</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Not enabled</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Login Sessions</p>
              <p className="text-sm text-muted-foreground">1 active session</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            { label: 'Transaction Alerts', desc: 'Get notified for every transaction' },
            { label: 'Bill Reminders', desc: 'Receive reminders before bills are due' },
            { label: 'Budget Alerts', desc: 'Be alerted when approaching budget limits' },
            { label: 'Security Alerts', desc: 'Important security notifications' },
          ].map((notif) => (
            <div key={notif.label} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="font-medium">{notif.label}</p>
                <p className="text-sm text-muted-foreground">{notif.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input" />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy & Preferences */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Privacy & Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Data Sharing</p>
              <p className="text-sm text-muted-foreground">Allow analytics for improvements</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input" />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Marketing Communications</p>
              <p className="text-sm text-muted-foreground">Receive offers and updates</p>
            </div>
            <input type="checkbox" className="h-4 w-4 rounded border-input" />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <p className="font-medium">Personalization</p>
              <p className="text-sm text-muted-foreground">Use data to personalize your experience</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input" />
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Account Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Currency</label>
            <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>GBP - British Pound</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Default Language</label>
            <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <h2 className="text-lg font-semibold mb-6 text-destructive">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
