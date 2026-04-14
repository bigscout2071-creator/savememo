import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

async function executeSql(sql) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'apikey': SUPABASE_SERVICE_KEY,
      },
      body: JSON.stringify({ sql }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

async function createTable() {
  console.log('🚀 Starting database migration...');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);

  // Check if table already exists
  try {
    const { data, error } = await supabase
      .from('memos')
      .select('count(*)', { count: 'exact', head: true });

    if (!error) {
      console.log('✅ Table "memos" already exists!');
      console.log('📊 Database is ready to use.');
      return;
    }
  } catch (err) {
    console.log('ℹ️  Table does not exist yet, creating...');
  }

  // Create table if it doesn't exist
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS public.memos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      created_by TEXT,
      is_pinned BOOLEAN DEFAULT false,
      is_deleted BOOLEAN DEFAULT false
    );

    -- Create index for faster queries
    CREATE INDEX IF NOT EXISTS idx_memos_created_at ON public.memos(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_memos_tags ON public.memos USING GIN(tags);

    -- Enable RLS (Row Level Security)
    ALTER TABLE public.memos ENABLE ROW LEVEL SECURITY;

    -- Allow anonymous access for now (you should configure proper RLS policies)
    CREATE POLICY "Allow all access" ON public.memos FOR ALL USING (true);
  `;

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: createTableSQL,
    });

    if (error && error.message.includes('does not exist')) {
      // Fallback: Create table using REST API directly
      console.log('ℹ️  Using fallback method to create table...');
      
      // For now, log instructions for manual creation
      console.log(`
📋 Please run this SQL in your Supabase SQL Editor:

${createTableSQL}

Or use the Supabase Dashboard → SQL Editor → New Query
      `);
      return;
    }

    if (error) throw error;

    console.log('✅ Table "memos" created successfully!');
    console.log('📊 Database schema:');
    console.log('   - id (UUID, Primary Key)');
    console.log('   - title (TEXT)');
    console.log('   - content (TEXT)');
    console.log('   - tags (TEXT[])');
    console.log('   - created_at (TIMESTAMP)');
    console.log('   - updated_at (TIMESTAMP)');
    console.log('   - created_by (TEXT)');
    console.log('   - is_pinned (BOOLEAN)');
    console.log('   - is_deleted (BOOLEAN)');
    console.log('\n✨ Migration complete! Ready to use.');
  } catch (error) {
    console.error('❌ Error creating table:', error.message);
    console.log('\n💡 Manual Setup:');
    console.log('1. Visit: ' + SUPABASE_URL + '/project/_/sql');
    console.log('2. Copy and paste the SQL above');
    console.log('3. Click "Run"');
    process.exit(1);
  }
}

createTable();
