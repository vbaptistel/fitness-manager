# Database Schema Design

This document outlines the relational schema for the PostgreSQL database (hosted on Supabase).

## Entity Relationship Diagram (Conceptual)

`Users` (1) ---- (N) `Appointments` (N) ---- (1) `Services`
`Users` (1) ---- (N) `Assessments`

## Tables

### 1. profiles (Public User Data)

Extends `auth.users` to store application-specific data.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK, FK -> auth.users.id | Unique user identifier |
| `email` | Text | Unique | User email |
| `full_name` | Text | | Display name |
| `phone` | Text | | For WhatsApp/SMS contact |
| `role` | Enum | Default 'client' | Values: `admin`, `client` |
| `created_at` | Timestamp | | Account creation date |

### 2. services (Offerings)

Catalog of services Flávio offers.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `name` | Text | | e.g., "Consultoria Online", "Personal Training" |
| `description` | Text | | Marketing copy for the service |
| `duration_min` | Integer | | Duration in minutes (e.g., 60) |
| `price_cents` | Integer | | Price in centavos (e.g., 15000 = R$ 150,00) |
| `is_active` | Boolean | Default true | Soft delete/hide |

### 3. appointments (Scheduling)

The core booking records.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `user_id` | UUID | FK -> profiles.id | The client booking |
| `service_id` | UUID | FK -> services.id | The service booked |
| `start_time` | Timestamp | | ISO 8601 DateTime (stored in UTC) |
| `end_time` | Timestamp | | Calculated from start + service duration |
| `status` | Enum | | `pending_payment`, `confirmed`, `cancelled`, `completed` |
| `location` | Enum | | `online` (Zoom link), `clinic` (Physical) |
| `notes` | Text | | Optional notes from client |

### 4. assessments (Physical & Biomechanical)

Tracking client metrics over time. Designed for flexibility (simple or detailed).
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `user_id` | UUID | FK -> profiles.id | Target client |
| `date` | Date | | Date of assessment |
| `weight_kg` | Decimal | | Body weight |
| `height_cm` | Decimal | | Height |
| `body_fat_percent` | Decimal | | Calculated Body Fat % |
| `method` | Text | | 'pollock7', 'bioimpedance', etc. |
| `photos_front_url` | Text | | URL to progress photo |
| `photos_back_url` | Text | | URL to progress photo |
| `photos_side_url` | Text | | URL to progress photo |
| `notes` | Text | | Coach feedback/observations |
| `created_at` | Timestamp | | |

### 5. measurements_detail (Detailed Anthropometry)

Linked to an assessment. Stores raw data for biomechanics/skinfolds.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `assessment_id` | UUID | FK -> assessments.id | Parent assessment |
| `chest_cm` | Decimal | | Circumference |
| `waist_cm` | Decimal | | Circumference |
| `hips_cm` | Decimal | | Circumference |
| `arm_right_cm` | Decimal | | Circumference |
| `thigh_right_cm` | Decimal | | Circumference |
| `skinfold_abdominal`| Decimal | | mm |
| `skinfold_suprailiac`| Decimal | | mm |
| `skinfold_triceps` | Decimal | | mm |

### 6. training_plans (Workout Prescriptions)

The actual deliverables for the client.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `user_id` | UUID | FK -> profiles.id | |
| `title` | Text | | e.g. "Hypertrophy Phase 1" |
| `start_date` | Date | | |
| `end_date` | Date | | |
| `goal` | Text | | "Weight Loss", "Performance" |
| `is_active` | Boolean | | |

### 7. workout_exercises (Exercises in a Plan)

| Column          | Type    | Constraints             | Description                     |
| :-------------- | :------ | :---------------------- | :------------------------------ |
| `id`            | UUID    | PK                      |                                 |
| `plan_id`       | UUID    | FK -> training_plans.id |                                 |
| `exercise_name` | Text    |                         | e.g. "Bench Press"              |
| `sets`          | Integer |                         |                                 |
| `reps`          | Text    |                         | "12-15" or "Failure"            |
| `rpe`           | Integer |                         | Rated Perceived Exertion (1-10) |
| `video_url`     | Text    |                         | Link to demo video              |

### 8. packages (Optional - Phase 2)

For tracking bundles (e.g., "10 Sessions Pack").
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PK | |
| `user_id` | UUID | FK -> profiles.id | |
| `total_sessions` | Integer | | Initial count |
| `sessions_remaining`| Integer | | Current balance |

## Row Level Security (RLS) Strategy

- **profiles:** Users can read/update their own profile. Admin can read/update all.
- **appointments:** Users can read their own. Admin can read all.
- **assessments:** Users can read their own. Admin can write.
- **training_plans:** Users can read their own. Admin can write.
