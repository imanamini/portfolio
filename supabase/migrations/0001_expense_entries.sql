create table public.expense_entries (
  id bigint generated always as identity primary key,
  jalali_year integer not null,
  jalali_month integer not null check (jalali_month between 1 and 12),
  kind text not null check (kind in ('income', 'expense')),
  label text not null default '',
  amount numeric not null default 0,
  checked boolean not null default false,
  created_at timestamptz not null default now()
);

create index expense_entries_month_idx on public.expense_entries (jalali_year, jalali_month);

alter table public.expense_entries enable row level security;

create policy "authenticated full access"
  on public.expense_entries
  for all
  to authenticated
  using (true)
  with check (true);
