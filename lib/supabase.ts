import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://diksvhkjuexnyoqlrbjz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpa3N2aGtqdWV4bnlvcWxyYmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzkwNTcsImV4cCI6MjA3ODExNTA1N30.J8uqb2ihW8RBpFocB44ieOt5e1sSltOPRs1QY7Ivk8k';

export const supabase = createClient(supabaseUrl, supabaseKey);
