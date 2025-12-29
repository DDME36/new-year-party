import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfvqngorkzakfndmyboh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdnFuZ29ya3pha2ZuZG15Ym9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzE4NTMsImV4cCI6MjA4MjYwNzg1M30.k2ti7xeDSndYAmHwOGSnXkdSPsS9oPgxdbXJMNTXBhk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Guest {
    id: string
    name: string
    registered_at: string
    checked_in: boolean
    checked_in_at: string | null
}
