# API Route Definitions

This document outlines the internal API routes built within Next.js (`/app/api/...`).

## Authentication

Authentication is primarily handled by the Supabase Client SDK, but server-side validation is performed in Middleware.

## Appointments

### GET `/api/appointments`

Returns a list of appointments.

- **Query Params:**
  - `from` (Date): Start range
  - `to` (Date): End range
- **Behavior:**
  - If **Admin**: Returns all appointments in range.
  - If **Client**: Returns only _their_ appointments.

### POST `/api/appointments`

Creates a _tentative_ appointment (pending payment).

- **Body:**
  ```json
  {
    "service_id": "uuid",
    "start_time": "ISO-8601",
    "location": "online" | "clinic"
  }
  ```
- **Response:** Returns the created appointment object and potentially a Stripe Checkout Session URL.

### PATCH `/api/appointments/[id]`

Updates status or rescheduling.

- **Body:**
  ```json
  {
    "status": "cancelled",
    "reason": "Sick leave"
  }
  ```

## Webhooks

### POST `/api/webhooks/stripe`

Standard Stripe webhook handler.

- **Events Listened:**
  - `checkout.session.completed`:
    1.  Verify signature.
    2.  Extract `client_reference_id` (User ID) and `metadata` (Appointment ID).
    3.  Update `appointments` table status to `confirmed`.
    4.  Send confirmation email.

## User Data

### GET `/api/user/assessments`

Fetches progress history for charts.

- **Response:**
  ```json
  [
    { "date": "2024-01-01", "weight": 80.5, "fat": 15.2 },
    { "date": "2024-02-01", "weight": 79.0, "fat": 14.5 }
  ]
  ```
