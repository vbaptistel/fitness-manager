-- Create Schema
create schema if not exists fitness;

-- Grant usage on schema to authenticated users (and anon if needed)
grant usage on schema fitness to postgres,
anon,
authenticated,
service_role;

grant all privileges on all tables in schema fitness to postgres,
anon,
authenticated,
service_role;

grant all privileges on all functions in schema fitness to postgres,
anon,
authenticated,
service_role;

grant all privileges on all sequences in schema fitness to postgres,
anon,
authenticated,
service_role;

alter default privileges in schema fitness grant all on tables to postgres,
anon,
authenticated,
service_role;

alter default privileges in schema fitness grant all on functions to postgres,
anon,
authenticated,
service_role;

alter default privileges in schema fitness grant all on sequences to postgres,
anon,
authenticated,
service_role;

-- Create appointments table in 'fitness' schema
create table fitness.appointments (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    status text check (
        status in ('scheduled', 'completed', 'cancelled')
    ) default 'scheduled',
    notes text,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- RLS Policies
alter table
    fitness.appointments enable row level security;

create policy "Users can view their own appointments" on fitness.appointments for
select
    using (auth.uid() = user_id);

create policy "Users can insert their own appointments" on fitness.appointments for
insert
    with check (auth.uid() = user_id);

create policy "Users can update their own appointments" on fitness.appointments for
update
    using (auth.uid() = user_id);