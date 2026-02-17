-- Ensure schema exists (handled in appointments migration, but safe to repeat)
create schema if not exists fitness;

-- 1. Exercises Library (Generic list of exercises)
create table fitness.exercises (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    muscle_group text not null,
    -- 'chest', 'back', 'legs', 'shoulders', 'arms', 'core'
    video_url text,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- 2. Training Plans (Assigned to a user)
create table fitness.training_plans (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    -- e.g., "Hipertrofia - Fase 1"
    description text,
    start_date date default CURRENT_DATE,
    end_date date,
    active boolean default true,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- 3. Workouts (Specific days/routines within a plan)
create table fitness.workouts (
    id uuid default gen_random_uuid() primary key,
    plan_id uuid references fitness.training_plans(id) on delete cascade not null,
    name text not null,
    -- e.g., "Treino A - Peito e Tríceps"
    description text,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- 4. Workout Exercises (The actual prescription)
create table fitness.workout_exercises (
    id uuid default gen_random_uuid() primary key,
    workout_id uuid references fitness.workouts(id) on delete cascade not null,
    exercise_id uuid references fitness.exercises(id) on delete cascade not null,
    order_index integer not null,
    -- To sort the exercises
    sets integer,
    reps text,
    -- text to allow ranges like "10-12"
    rpe integer,
    -- Rate of Perceived Exertion (1-10)
    rest_time_seconds integer,
    notes text,
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- RLS Policies
alter table
    fitness.exercises enable row level security;

alter table
    fitness.training_plans enable row level security;

alter table
    fitness.workouts enable row level security;

alter table
    fitness.workout_exercises enable row level security;

-- Exercises are public to read for authenticated users
create policy "Exercises are viewable by everyone" on fitness.exercises for
select
    to authenticated using (true);

-- Plans are private to the user
create policy "Users can view their own training plans" on fitness.training_plans for
select
    using (auth.uid() = user_id);

-- Workouts are viewable if the plan belongs to the user
create policy "Users can view their own workouts" on fitness.workouts for
select
    using (
        exists (
            select
                1
            from
                fitness.training_plans
            where
                id = fitness.workouts.plan_id
                and user_id = auth.uid()
        )
    );

-- Workout Exercises are viewable if the workout belongs to a plan that belongs to the user
create policy "Users can view their own workout exercises" on fitness.workout_exercises for
select
    using (
        exists (
            select
                1
            from
                fitness.workouts
                join fitness.training_plans on fitness.workouts.plan_id = fitness.training_plans.id
            where
                fitness.workouts.id = fitness.workout_exercises.workout_id
                and fitness.training_plans.user_id = auth.uid()
        )
    );