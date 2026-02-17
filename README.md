🧠 Triage Dashboard – 24H Engineering Challenge

A production-style Customer Support Triage Dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS.

This tool is designed to help a support lead quickly assess incoming tickets by:

Structuring unorganized messages

Classifying issue types

Prioritizing urgency

Providing actionable summary metrics

The project was completed within a strict 24-hour time constraint.

🔗 Live & Repository

Live Deployment: <your-vercel-link>
Repository: https://github.com/zakirhasan736/triage-dashboard-24h-challenge

🎯 Problem Framing

Support teams often begin their day with unstructured inbound messages.
The goal of this exercise was to design a lightweight internal tool that:

Converts raw messages into structured insight

Surfaces urgency clearly

Enables fast filtering and decision-making

Remains simple enough to ship in 24 hours

The emphasis was on clarity, explainability, and usability, not infrastructure complexity.

🏗 Architecture & Design Decisions
Why Next.js (Frontend-Only)?

Minimal infrastructure overhead

Clean routing & layout separation

First-class TypeScript support

Easy deployment via Vercel

A backend/database was intentionally excluded to maintain focus on product logic and execution speed.

High-Level Architecture
/app            → Routing & layout (Next.js App Router)
/components     → UI building blocks
/hooks          → Business logic & centralized state
/icons          → Reusable SVG components
/services       → AI classification integration
/types          → Domain models
/constants.ts   → Shared configuration

Key Design Principles

Separation of concerns

Centralized ticket state management

Deterministic fallback logic

Explainable prioritization rules

Extensibility without over-engineering

🧠 Classification & Prioritization Strategy

The system uses a hybrid intelligence model to balance reliability and flexibility.

Primary Mode: AI-Assisted Classification (Gemini 1.5 Flash)

When an API key is available:

Structured prompt defines fixed categories:

Bug

Billing

Feature Request

Account

General

Fixed priority levels:

High

Medium

Low

Strict JSON schema enforcement

Model returns confidence score (0.0–1.0)

This approach ensures:

Controlled output structure

Reduced parsing risk

Measurable classification confidence

Fallback Mode: Deterministic Rule Engine

If AI is unavailable, the system falls back to a keyword-based classifier.

Category Mapping
Keywords	Category
invoice, charged, payment	Billing
crash, error, broken	Bug
add, support, integration	Feature Request
login, password, access	Account
Otherwise	General
Priority Heuristics

High Impact Signals

crash

cannot

charged twice

payment failed

urgent

broken

Medium Impact Signals

slow

error

wrong

not working

All fallback classifications are marked with confidence 0.0 to clearly distinguish heuristic decisions.

📊 Product Features
1. Summary Intelligence Layer

Total tickets

Category distribution

Priority distribution

High-priority open count

Designed to allow decision-making in under 10 seconds.

2. Interactive Ticket Management

Category + priority badges

Status toggling (Open / Resolved)

Filtering (Category / Priority / Status)

Search capability

Sorting (urgency-first by default)

Inline editing & assignment

High-priority tickets are visually differentiated to reduce cognitive load.

🔄 State Management Approach

A custom useTicketManagement hook centralizes:

Ticket lifecycle management

Filtering logic

Sorting logic

Status updates

AI integration

This avoids prop-drilling and keeps UI components declarative and predictable.

Data flow remains unidirectional and deterministic.

⏱ 24-Hour Execution Breakdown
Hours 0–2

Architecture planning & domain modeling

Hours 3–8

Core layout + ticket state implementation

Hours 9–12

Filtering system + prioritization logic

Hours 13–15

UI polish + priority visibility refinement

Hours 16–18

Documentation & structural refactoring

Hours 19–22

Deployment & environment validation

Hours 23–24

Final cleanup & consistency review

🚀 Running the Project
Install dependencies
npm install

Optional AI Setup

Create .env.local:

NEXT_PUBLIC_API_KEY=your_google_genai_api_key


If omitted, the rule-based engine is used automatically.

Start development server
npm run dev


Visit:

http://localhost:3000

🔮 If Given More Time

Persistent storage (PostgreSQL / Supabase)

SLA tracking and breach alerts

Real-time multi-agent collaboration

RAG-based response suggestions

Historical trend analytics

Role-based authentication

The current architecture was intentionally designed to accommodate these expansions without structural changes.

🧩 Tradeoffs & Constraints

No backend persistence (intentionally omitted for speed)

AI classification remains optional

Static dataset for demonstration purposes

Focused on clarity and decision-support rather than full CRM functionality

The goal was to ship a thoughtful, structured solution within 24 hours — not to over-engineer.