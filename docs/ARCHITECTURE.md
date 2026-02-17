# Architecture Overview

## System Context

The application is a Monorepo-style structure managed within a Next.js application. It serves two distinct audiences:

1.  **Public/Leads:** Fast, SEO-optimized marketing pages (Hotsite).
2.  **Authenticated Users:** Interactive dashboards for Clients and the Administrator (Flávio).

## Frontend Architecture (Next.js App Router)

The project uses the Next.js 14+ App Router for performance and organization.

### Folder Structure Strategy

```
/app
  ├── (public)             # Marketing pages (Hotsite)
  │   ├── page.tsx         # Home / Landing
  │   ├── sobre/           # About Flávio
  │   └── servicos/        # Services showcase
  ├── (auth)               # Authentication routes
  │   ├── login/
  │   └── signup/
  ├── (dashboard)          # Protected Routes (Requires Auth)
  │   ├── client/          # Client Portal
  │   │   ├── schedule/    # Booking interface
  │   │   └── history/     # Assessments/Training
  │   └── admin/           # Admin Portal (Flávio only)
  │       ├── calendar/    # Master schedule
  │       └── patients/    # CRM / Electronic Health Records
  └── api/                 # Backend API Routes
```

## Backend Services

### Database (Supabase)

- **Type:** Postgres Relational Database.
- **Access:** Accessed via Supabase Client (Client-side and Server-side).
- **Security:** Row Level Security (RLS) policies enforce data isolation.
  - _Clients_ can only see their own records.
  - _Admin_ can see all records.

### Authentication (Supabase Auth)

- **Providers:** Email/Password, Magic Link (optional Google Auth).
- **Roles:** Managed via a `profiles` table linked to `auth.users`.
  - `role: 'admin'` -> Full access.
  - `role: 'client'` -> Restricted access.

### Payments (Stripe)

- **Method:** Stripe Checkout Sessions (Hosted UI) for security and ease.
- **Webhooks:** Listens for `checkout.session.completed` to update database state (e.g., mark appointment as paid).

## Key Workflows

### 1. Booking Flow

1.  User selects Service (e.g., "Consultancy") -> UI shows Calendar.
2.  User picks a Slot (checked against DB availability).
3.  User is redirected to Stripe Checkout.
4.  Payment Success -> Webhook updates Appointment Status to `confirmed`.
5.  Email notification sent (via Resend or Supabase Edge Functions).

### 2. Physical Assessment Flow

1.  Admin updates Client Profile with new metrics (Weight, Body Fat).
2.  System stores snapshot in `assessments` table.
3.  Client Dashboard fetches data and renders Progress Chart (Recharts/Chart.js).
