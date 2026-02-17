# Flávio Di Giovanni - Integrated Platform

## Overview

This project is a comprehensive digital platform for **Flávio Di Giovanni**, a Physical Education Specialist and Sports Consultant. The system integrates his digital presence (Hotsite) with business management tools (Scheduling, Payments, Client Tracking).

The solution aims to unify:

1.  **Institutional & Marketing:** Showcasing expert services in Health, Aesthetics, and Performance.
2.  **Commercial & Financial:** Selling plans, packages, and managing payments via Stripe/PIX.
3.  **Clinical & Technical:** Managing client history (Anamnesis), assessments, and training prescriptions.
4.  **Client Portal:** A dedicated area for clients to view their schedule, plans, and progress.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router) - React, TypeScript.
- **Styling:** [Tailwind CSS](https://tailwindcss.com).
- **Database & Auth:** [Supabase](https://supabase.com) (PostgreSQL).
- **Payments:** [Stripe](https://stripe.com) (Credit Card & PIX).
- **Deployment:** Vercel (Recommended).

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm or npm
- Supabase Account
- Stripe Account

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd flavio-di-giovanni
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  Configure Environment Variables:
    Copy `.env.example` to `.env.local` and fill in your keys:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    STRIPE_SECRET_KEY=your-stripe-secret
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## Project Structure

Detailed documentation can be found in the `/docs` folder:

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Database Schema](docs/SCHEMA.md)
- [API Reference](docs/API.md)
