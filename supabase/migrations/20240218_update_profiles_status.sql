alter table fitness.profiles add column if not exists status text check (status in ('active', 'inactive')) default 'active';
