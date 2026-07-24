// Test Supabase connection and table existence
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error('   VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗');
  process.exit(1);
}

console.log('✓ Environment variables loaded');
console.log('  URL:', supabaseUrl);
console.log('  Key:', supabaseAnonKey.substring(0, 20) + '...\n');

// Test 1: Check if table exists
console.log('📋 Test 1: Checking if consultation_appointments table exists...');

try {
  const response = await fetch(`${supabaseUrl}/rest/v1/consultation_appointments?limit=1`, {
    method: 'GET',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
    }
  });

  if (response.ok) {
    console.log('✅ Table exists and is accessible\n');
  } else if (response.status === 404) {
    console.error('❌ Table does not exist!');
    console.error('   Run the SQL script: supabase-consultation-appointments.sql\n');
    process.exit(1);
  } else if (response.status === 401 || response.status === 403) {
    console.error('❌ Authentication failed!');
    console.error('   Status:', response.status);
    console.error('   Check your VITE_SUPABASE_ANON_KEY is correct\n');
    process.exit(1);
  } else {
    const error = await response.text();
    console.error('❌ Unexpected error:', response.status);
    console.error('   Response:', error, '\n');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Connection error:', error.message, '\n');
  process.exit(1);
}

// Test 2: Try to insert a test record
console.log('📝 Test 2: Attempting to insert a test record...');

const testData = {
  name: 'Test User - ' + new Date().toISOString(),
  email: 'test@example.com',
  phone: '+1234567890',
  language: 'English',
  timezone: 'America/New_York',
  selected_slots: [
    { date: '2026-07-30', time: '10:00' },
    { date: '2026-07-31', time: '14:30' }
  ],
  email_sent: true,
  email_id: 'test-email-id-' + Date.now(),
  status: 'pending',
  user_agent: 'Test Script',
  source_page: 'test-supabase-connection.js'
};

try {
  const response = await fetch(`${supabaseUrl}/rest/v1/consultation_appointments`, {
    method: 'POST',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(testData)
  });

  if (response.ok) {
    const records = await response.json();
    const record = records[0];
    console.log('✅ Test record inserted successfully!');
    console.log('   ID:', record.id);
    console.log('   Created at:', record.created_at);
    console.log('   Name:', record.name);
    console.log('\n🎉 Supabase is working correctly!\n');
  } else {
    const error = await response.text();
    console.error('❌ Failed to insert test record');
    console.error('   Status:', response.status);
    console.error('   Response:', error);
    console.error('\nPossible issues:');
    console.error('   1. Table does not exist - run supabase-consultation-appointments.sql');
    console.error('   2. RLS policy blocking inserts - check Row Level Security settings');
    console.error('   3. Missing required fields or constraint violations\n');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Insert error:', error.message, '\n');
  process.exit(1);
}

// Test 3: Read the record back
console.log('📖 Test 3: Reading the record back...');

try {
  const response = await fetch(`${supabaseUrl}/rest/v1/consultation_appointments?order=created_at.desc&limit=1`, {
    method: 'GET',
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
    }
  });

  if (response.ok) {
    const records = await response.json();
    console.log('✅ Successfully read', records.length, 'record(s)');
    if (records.length > 0) {
      console.log('   Latest record:', records[0].name);
    }
    console.log('\n✨ All tests passed! Your Supabase integration is working!\n');
  } else {
    const error = await response.text();
    console.error('⚠️  Warning: Could not read records');
    console.error('   Status:', response.status);
    console.error('   Response:', error, '\n');
  }
} catch (error) {
  console.error('⚠️  Warning: Read error:', error.message, '\n');
}
