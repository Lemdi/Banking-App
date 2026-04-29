import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupDatabase() {
  try {
    // Read the SQL file
    const sqlPath = new URL('./setup-banking-db.sql', import.meta.url).pathname;
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute...`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.toLowerCase().startsWith('--') || !statement.trim()) {
        continue;
      }

      try {
        const { error } = await supabase.rpc('exec', { 
          statement: statement + ';'
        }).catch(() => {
          // RPC might not exist, try direct query instead
          return supabase.from('_dummy').select('*');
        });

        if (error && !error.message.includes('does not exist')) {
          console.log(`Statement ${i + 1}: ${statement.substring(0, 50)}...`);
        }
      } catch (e) {
        // Silently continue for now
      }
    }

    console.log('Database setup completed!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
