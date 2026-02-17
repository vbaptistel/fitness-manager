-- Ensure schema exists
create schema if not exists fitness;

-- Create a table for public profiles in fitness schema
create table fitness.profiles (
    id uuid references auth.users(id) on delete cascade not null primary key,
    full_name text,
    phone text,
    birth_date date,
    height_cm numeric,
    -- keeping it simple
    weight_kg numeric,
    -- current weight
    gender text check (gender in ('M', 'F', 'Other')),
    goals text,
    -- e.g. "Hypertrophy", "Weight Loss"
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    updated_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- Turn on Row Level Security
alter table
    fitness.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on fitness.profiles for
select
    using (true);

create policy "Users can insert their own profile." on fitness.profiles for
insert
    with check (auth.uid() = id);

create policy "Users can update own profile." on fitness.profiles for
update
    using (auth.uid() = id);

-- Function to handle new user signup
create
or replace function public.handle_new_user() returns trigger as $ $ begin
insert into
    fitness.profiles (id, full_name)
values
    (new.id, new.raw_user_meta_data ->> 'full_name');

return new;

end;

$ $ language plpgsql security definer;

-- Trigger the function every time a user is created
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after
insert
    on auth.users for each row execute procedure public.handle_new_user();