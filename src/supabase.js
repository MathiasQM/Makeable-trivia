import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://lrtfzettlujmaattnlhy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydGZ6ZXR0bHVqbWFhdHRubGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY5MDMzNDUsImV4cCI6MTk5MjQ3OTM0NX0.LA02NVWUUbtlnEXJTAiWHe9MJkDjMgW6n0lAoVR3QLU"

export const supabase = createClient(supabaseUrl, supabaseKey)