-- StartWithAI: Supabase schema
-- Run in Supabase SQL editor.

-- Extensions
create extension if not exists pgcrypto;

-- Visits: every site entry (page view / first open)
create table if not exists public.site_visits (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  path text not null,
  website text,
  email text,
  referrer text,
  user_agent text,
  ip text,
  created_at timestamptz not null default now()
);
create index if not exists site_visits_session_id_idx on public.site_visits(session_id);
create index if not exists site_visits_created_at_idx on public.site_visits(created_at);

-- Leads: progressive/partial intake data
create table if not exists public.chat_leads (
  id uuid primary key,
  session_id text not null,
  website text,
  email text,
  progress int not null default 0,
  completed boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  last_question text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);
create index if not exists chat_leads_session_id_idx on public.chat_leads(session_id);
create index if not exists chat_leads_created_at_idx on public.chat_leads(created_at);
create index if not exists chat_leads_updated_at_idx on public.chat_leads(updated_at);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_chat_leads_updated_at on public.chat_leads;
create trigger set_chat_leads_updated_at
before update on public.chat_leads
for each row execute function public.set_updated_at();

-- Business inquiries: full contact survey submissions
create table if not exists public.business_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null,
  phone text,
  website text,
  business_type text,
  team_size text,
  services text[] default '{}',
  pains text,
  budget text,
  timeline text,
  details text,
  voucher_interest boolean default false,
  resend_id text,
  status text default 'new',
  created_at timestamptz not null default now()
);
create index if not exists business_inquiries_email_idx on public.business_inquiries(email);
create index if not exists business_inquiries_created_at_idx on public.business_inquiries(created_at);
create index if not exists business_inquiries_status_idx on public.business_inquiries(status);
