import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gpmrybsiwqoumhafinmr.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbXJ5YnNpd3FvdW1oYWZpbm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODUyMjAsImV4cCI6MjA1NjY2MTIyMH0.OPNljJJgRHN2B93iAqRyMnbrLRQbBSrapLiFR0M1EUc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
