# Functional Documentation

This document describes the functional requirements, user personas, and core flows of the Flávio Di Giovanni Integrated Platform. It serves as a guide for what features to build and why.

## 1. User Personas

### 1.1. Flávio Di Giovanni (Admin)

- **Role:** Physical Education Specialist, Sports Consultant, Business Owner.
- **Goals:**
  - Minimize time spent on WhatsApp scheduling changes.
  - Centralize patient records (anamnesis + physical assessments) in one safe place.
  - Sell generic plans (e.g., "30-Day Fat Loss") and personalized high-ticket coaching effectively.
  - Showcase authority through a professional digital presence.
- **Pain Points:** Disorganized spreadsheets, no-shows for appointments, manual payment collection.

### 1.2. The Lead (Prospective Client)

- **Role:** Someone looking for weight loss, aesthetics, or sports performance in Socorro/SP or Online.
- **Goals:**
  - Understand if Flávio is the right professional (Social Proof).
  - See pricing transparency (or easily request a quote).
  - Book a first consultation without friction.

### 1.3. The Client (Active Patient/Athlete)

- **Role:** A recurring customer (Personal Training or Monthly Consulting).
- **Goals:**
  - Access their current training plan easily (mobile).
  - See their visual progress (Graphs: Weight, Body Fat, Photos) to stay motivated.
  - Schedule their inclusive sessions (if part of a package).

---

## 2. Modules & Features

### Module A: Institutional Hotsite (Marketing)

- **Hero Section:** High-impact video/photo of Flávio, clear value proposition ("Saúde e Qualidade de Vida").
- **About Page:** Timeline of his career, degrees (PUC-Campinas), and certifications.
- **Services Showcase:**
  1.  **Clinical Consultancy:** Focus on quality of life and rehabilitation.
  2.  **Sports Performance:** For athletes (running, triathlon, team sports).
  3.  **Personal Training:** 1-on-1 sessions.
- **Social Proof:** Before/After slider (with privacy consent) and text testimonials.
- **Blog/Tips:** Simple CMS integration to post articles about biomechanics and health (SEO Strategy).

### Module B: Scheduling & Commercial

- **Services Config:** Admin can define:
  - _Service Name_ (e.g., "Avaliação Física Completa").
  - _Duration_ (e.g., 60 min).
  - _Modality_ (Online/In-Person).
  - _Price_ (R$).
- **Availability Rules:** Flávio defines "Working Hours" (e.g., Mon-Fri 08:00-18:00, Lunch 12:00-13:00).
- **Booking Flow:**
  1.  Client selects Service.
  2.  System shows available slots.
  3.  Client confirms + Pays (or uses Credits).
  4.  Google Calendar / System Calendar block.

### Module C: Technical Management (The "Clinic")

- **Digital Anamnesis:** A comprehensive form sent to new clients (History of injuries, surgeries, medications, lifestyle).
- **Physical Assessment Tool:**
  - **Input:** Weight, Height, Skinfolds (7-fold Pollock), Circumferences.
  - **Output:** Auto-calculation of Body Fat %, BMI, Muscle Mass estimation.
- **Training Prescription:**
  - Builder to create "Plan A", "Plan B".
  - Database of exercises with video links (Youtube/Vimeo).

### Module D: Client Portal (Engagement)

- **Dashboard:** "Next Appointment", "Current Goal".
- **My Evolution:** Interactive charts (Line Chart) showing Weight/Fat % dropping over time.
- **My Plans:** Read-only view of the assigned daily workout.

---

## 3. Core User Flows (User Stories)

### Flow 1: New Client Acquisition

> "As a visitor, I want to learn about Flávio's methodology and book a first assessment."

1.  Visitor lands on Hotsite.
2.  Reads "About" and "Testimonials".
3.  Clicks "Agendar Avaliação".
4.  Prompts to Create Account (Email/Pass).
5.  Selects "Avaliação Física (Presencial)".
6.  Picks Date/Time.
7.  Pays via Stripe (Credit Card/PIX).
8.  Receives Confirmation Email + Anamnesis Form link.

### Flow 2: The Check-up (Assessment)

> "As Flávio, I want to record assessment data quickly during the consultation."

1.  Flávio opens Admin Dashboard > "Agenda".
2.  Clicks on the slot > "Open Patient Record".
3.  Navigates to "New Assessment".
4.  Inputs skinfold measurements (mm) while measuring the client.
5.  Uploads "Front/Side/Back" photos taken with phone/tablet.
6.  Clicks "Save".
7.  System generates a "Progress Report" visible to the client immediately.

### Flow 3: Training Access

> "As a client, I want to see what I need to train today."

1.  Client logs in on Mobile.
2.  Dashboard shows "Active Plan: Hypertrophy Phase 2".
3.  Clicks "View Plan".
4.  Sees list: "Bench Press - 4x12", "Squat - 4x10".
5.  Clicks exercise to see Flávio's demo video.
