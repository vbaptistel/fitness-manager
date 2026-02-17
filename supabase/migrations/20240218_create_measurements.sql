-- Ensure schema exists
create schema if not exists fitness;

-- Create measurements table
create table fitness.measurements (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    date date default CURRENT_DATE not null,
    weight numeric not null,
    -- kg
    body_fat numeric,
    -- percentage
    muscle_mass numeric,
    -- kg or percentage (optional)
    -- Circumferences (cm)
    chest numeric,
    waist numeric,
    hips numeric,
    arm_right numeric,
    arm_left numeric,
    thigh_right numeric,
    thigh_left numeric,
    calf_right numeric,
    calf_left numeric,
    photos_front_url text,
    photos_back_url text,
    photos_side_url text,
    notes text,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- RLS Policies
alter table
    fitness.measurements enable row level security;

create policy "Users can view their own measurements" on fitness.measurements for
select
    using (auth.uid() = user_id);

create policy "Users can insert their own measurements" on fitness.measurements for
insert
    with check (auth.uid() = user_id);

create policy "Users can update their own measurements" on fitness.measurements for
update
    using (auth.uid() = user_id);

create policy "Users can delete their own measurements" on fitness.measurements for delete using (auth.uid() = user_id);