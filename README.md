Triage Dashboard – Intelligent Customer Support Dashboard

A lightweight, intelligent customer support triage dashboard built with Next.js.
The system automatically categorizes and prioritizes incoming customer support messages to help support leads quickly understand what issues exist, how urgent they are, and how many of each type need attention.

This project was completed as part of a 24-hour build challenge.

🌐 Live Demo

Deployed App: <your-deployment-link>
Repository: (https://github.com/zakirhasan736/triage-dashboard-24h-challenge)

🚀 How to Run the Project
1. Prerequisites

Node.js (v16+ recommended)

npm or yarn

2. Install Dependencies
npm install

3. Setup API Key (Optional – AI Mode)

Create a .env.local file in the root directory:

API_KEY=your_google_genai_api_key


Note:

If no API key is provided, the application will automatically fall back to a deterministic keyword-based classification engine.

This ensures the dashboard remains fully functional even without AI integration.

4. Run Development Server
npm run dev

5. Open in Browser
http://localhost:3000

🏗️ Overall Approach

The goal was to design a lightweight internal triage tool that a support lead could use at the start of their day.

Key principles:

Keep infrastructure minimal (no backend required)

Prioritize clarity and usability

Ensure categorization logic is explainable

Provide fast filtering and summary metrics

Design for extensibility

Architecture Overview

Next.js frontend-only architecture

Hardcoded dataset (15–20 support messages)

Rule-based and AI hybrid classification

Centralized ticket state management

Clean separation of concerns:

components/   → UI building blocks
hooks/        → Business logic and ticket management
services/     → AI integration
lib/          → Classification logic
data/         → Static ticket dataset

Data Flow

The application uses a unidirectional data flow:

Tickets are loaded from a static dataset.

The classification engine assigns category and priority.

State is managed centrally (via custom hook).

UI reacts to filtered/sorted state.

🧠 Categorisation & Prioritisation Logic

The system uses a Hybrid Intelligence Model:

1️⃣ Primary Mode: Generative AI (Gemini 1.5 Flash)

When an API key is available:

A structured prompt defines:

Categories: Bug, Billing, Feature Request, Account, General

Priorities: High, Medium, Low

The AI is instructed to return strictly formatted JSON.

A confidence score (0.0–1.0) is requested from the model.

This ensures:

Consistent outputs

Safe parsing

Controlled schema structure

2️⃣ Fallback Mode: Deterministic Rule Engine

If AI is unavailable, the system uses a keyword-based engine.

Category Assignment Examples
Keywords	Category
invoice, charged, payment	Billing
crash, error, broken	Bug
add, support for, integration	Feature Request
login, password, access	Account
Otherwise	General
Priority Assignment Examples

High Priority

crash

cannot

charged twice

payment failed

urgent

broken

Medium Priority

slow

error

wrong

not working

Low Priority

Feature requests

General inquiries

Fallback classifications are marked with confidence 0.0 to indicate heuristic matching.

📊 Dashboard Features
Summary View

Total message count

Count per category

Count per priority

High-priority indicator

Ticket Table

Message snippet

Category badge

Priority badge (color-coded)

Status (Resolved / Open)

Filtering

Filter by Category

Filter by Priority

Toggle resolved messages

UX Details

High-priority tickets visually highlighted

Sorted by priority (High → Low) by default

Clean, high-density layout inspired by professional tools like Jira and Linear

⏱ 24-Hour Execution Plan

This project was completed within a strict 24-hour time constraint.

Hours 0–2

Design + architecture decisions
Defined data model, categorization approach, and UI layout.

Hours 3–8

Build core UI + logic
Implemented dashboard layout, ticket rendering, and state management.

Hours 9–12

Filtering + priority logic
Added rule engine, AI integration, filtering, and sorting.

Hours 13–15

Polish UI
Improved visual hierarchy, badge styling, and high-priority indicators.

Hours 16–18

Write README
Documented architecture, logic decisions, and future improvements.

Hours 19–22

Deploy + bug fixes
Deployed to Vercel and handled environment edge cases.

Hours 23–24

Final polish
Refactoring, UI cleanup, final testing, and review.

🔮 Future Improvements

If given more time, I would focus on:

1️⃣ Persistence

Replace in-memory state with a backend (PostgreSQL / Supabase).

2️⃣ SLA Tracking

Add response-time indicators and breach alerts.

3️⃣ Real-Time Updates

Use WebSockets to allow multi-agent collaboration.

4️⃣ RAG-Based AI Assistance

Provide suggested replies to support agents using documentation and past tickets.

5️⃣ Analytics

Add trend charts showing issue categories over time.

6️⃣ Authentication

Track which agent resolves each ticket.

🎯 Final Notes

This dashboard was designed to simulate a practical internal triage tool with:

Clear categorization logic

Explainable prioritization

Fast overview metrics

Minimal infrastructure complexity

Production-style UI clarity

The focus was on shipping a usable, well-structured solution within 24 hours while leaving room for intelligent expansion.