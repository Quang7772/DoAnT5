import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://oqiahrlzyhbyxbjcddxt.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xaWFocmx6eWhieXhiamNkZHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODM3NjAsImV4cCI6MjA3NzM1OTc2MH0.WfkY0yOW3cYegfRW_AfDBXDyXVi3W2s9rX5BthLYJhY";
export const supabase = createClient(
  "https://oqiahrlzyhbyxbjcddxt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xaWFocmx6eWhieXhiamNkZHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3ODM3NjAsImV4cCI6MjA3NzM1OTc2MH0.WfkY0yOW3cYegfRW_AfDBXDyXVi3W2s9rX5BthLYJhY"
);
