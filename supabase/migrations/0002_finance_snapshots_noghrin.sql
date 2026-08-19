-- نقرین (noghrin) is a new silver fund symbol tracked alongside نقران/نقرابی
alter table public.finance_snapshots
  add column noghrin numeric not null default 0;
