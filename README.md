# 🧠 Triage Dashboard -- 24H Engineering Challenge

A **production-style Customer Support Triage Dashboard** built with\
**Next.js (App Router) · TypeScript · Tailwind CSS**.

This tool enables support leads to:

-   🗂 Structure unorganized inbound messages\
-   🏷 Classify issue types\
-   ⚡ Prioritize urgency\
-   📊 View actionable summary insights

> ⏱ Completed within a strict 24-hour engineering constraint.

------------------------------------------------------------------------

# 🔗 Live & Repository

**🌐 Live Deployment:**\
https://triage-dashboard-24h-challenge.netlify.app/

**📦 GitHub Repository:**\
https://github.com/zakirhasan736/triage-dashboard-24h-challenge

------------------------------------------------------------------------

# 🎯 Problem Framing

Support teams typically begin their day with **unstructured inbound
requests**.

The objective of this challenge was to design a lightweight internal
tool that:

-   Converts raw text into structured insight\
-   Surfaces urgency clearly\
-   Enables fast filtering & decision-making\
-   Ships within 24 hours without over-engineering

The emphasis was on **clarity, explainability, usability, and execution
speed** --- not infrastructure complexity.

------------------------------------------------------------------------

# 🏗 Architecture & Design Decisions

## Why Next.js (Frontend-Only)?

-   Minimal infrastructure overhead\
-   Clean routing & layout separation\
-   First-class TypeScript support\
-   Simple deployment (Vercel / Netlify)

A backend/database was intentionally excluded to prioritize product
logic and rapid delivery.

------------------------------------------------------------------------

## 📁 High-Level Architecture

/app → Routing & layout (Next.js App Router)\
/components → UI building blocks\
/hooks → Business logic & centralized state\
/icons → Reusable SVG components\
/services → AI classification integration\
/types → Domain models\
/constants.ts → Shared configuration

------------------------------------------------------------------------

## 🧩 Core Design Principles

-   Separation of concerns\
-   Centralized ticket state management\
-   Deterministic fallback logic\
-   Explainable prioritization rules\
-   Extensibility without over-engineering

------------------------------------------------------------------------

# 🧠 Classification & Prioritization Strategy

The system uses a **Hybrid Intelligence Model** balancing flexibility
and reliability.

------------------------------------------------------------------------

## 🤖 Primary Mode --- AI-Assisted Classification (Gemini 1.5 Flash)

When an API key is available:

-   Structured prompt defines fixed categories:
    -   Bug
    -   Billing
    -   Feature Request
    -   Account
    -   General
-   Fixed priority levels:
    -   High
    -   Medium
    -   Low
-   Strict JSON schema enforcement\
-   Confidence score returned (0.0--1.0)

### Why This Matters

-   Controlled output structure\
-   Reduced parsing risk\
-   Measurable classification confidence

------------------------------------------------------------------------

## 🛠 Fallback Mode --- Deterministic Rule Engine

If AI is unavailable, a keyword-based classifier is used.

### 📂 Category Mapping

  Keywords                    Category
  --------------------------- -----------------
  invoice, charged, payment   Billing
  crash, error, broken        Bug
  add, support, integration   Feature Request
  login, password, access     Account
  Otherwise                   General

### ⚡ Priority Heuristics

**High Impact Signals** - crash\
- cannot\
- charged twice\
- payment failed\
- urgent\
- broken

**Medium Impact Signals** - slow\
- error\
- wrong\
- not working

Fallback classifications are marked with **confidence = 0.0** to clearly
distinguish heuristic results.

------------------------------------------------------------------------

# 📊 Product Features

## 1️⃣ Summary Intelligence Layer

-   Total ticket count\
-   Category distribution\
-   Priority distribution\
-   High-priority open count

Designed for decision-making in **under 10 seconds**.

------------------------------------------------------------------------

## 2️⃣ Interactive Ticket Management

-   Category & priority badges\
-   Status toggle (Open / Resolved)\
-   Filtering (Category / Priority / Status)\
-   Search capability\
-   Sorting (Urgency-first by default)\
-   Inline editing & assignment

High-priority tickets are visually differentiated to reduce cognitive
load.

------------------------------------------------------------------------

# 🔄 State Management Approach

A custom `useTicketManagement` hook centralizes:

-   Ticket lifecycle management\
-   Filtering logic\
-   Sorting logic\
-   Status updates\
-   AI integration

This avoids prop-drilling and keeps components declarative and
predictable.

Data flow remains **unidirectional and deterministic**.

------------------------------------------------------------------------

# ⏱ 24-Hour Execution Breakdown

**Hours 0--2**\
Architecture planning & domain modeling

**Hours 3--8**\
Core layout & ticket state implementation

**Hours 9--12**\
Filtering system & prioritization logic

**Hours 13--15**\
UI polish & urgency visibility refinement

**Hours 16--18**\
Documentation & structural refactoring

**Hours 19--22**\
Deployment & environment validation

**Hours 23--24**\
Final cleanup & consistency review

------------------------------------------------------------------------

# 🚀 Running the Project

## Install Dependencies

``` bash
npm install
```

## Optional AI Setup

Create `.env.local`:

``` env
NEXT_PUBLIC_API_KEY=your_google_genai_api_key
```

If omitted, the rule-based engine is used automatically.

## Start Development Server

``` bash
npm run dev
```

Visit:

http://localhost:3000

------------------------------------------------------------------------

# 🔮 If Given More Time

-   Persistent storage (PostgreSQL / Supabase)\
-   SLA tracking & breach alerts\
-   Real-time multi-agent collaboration\
-   RAG-based response suggestions\
-   Historical trend analytics\
-   Role-based authentication

The current architecture supports these extensions without structural
redesign.

------------------------------------------------------------------------

# 🧩 Tradeoffs & Constraints

-   No backend persistence (intentional for speed)\
-   AI classification optional\
-   Static dataset for demonstration\
-   Focused on decision-support rather than full CRM scope

The objective was to ship a thoughtful, structured solution within 24
hours --- **without over-engineering**.
