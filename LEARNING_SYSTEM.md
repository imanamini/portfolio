# Learning System — Architecture & Experience Log

> **Self-learn instructions for Claude:**
> Every time the learn-react system (or any sibling learning route) is meaningfully changed —
> new lessons added, architecture decisions revised, gotchas discovered, the skill updated —
> open this file and append a dated entry to the **Experience Log** section at the bottom.
> Never rewrite history. Only append. The log is the memory of what we learned by doing.

---

## What This System Is

A personal, self-paced learning tracker built inside the existing Angular portfolio at
`/home/iman/Personal/portfolio`.

It is designed around one principle: **learn from real code you already wrote, not toy examples**.

The first instance (`/learn-react`) teaches React by walking through the Pita-front monorepo
(`/home/iman/Digipay/Pita-front`) — a production kiosk + kitchen display app built in React + Nx.

---

## Architecture Overview

```
portfolio (Angular 21, standalone components, signals)
└── src/app/
    └── learn-react/
        ├── learn-react-data.ts   ← all lesson content (pure data, no Angular)
        ├── learn-react.ts        ← Angular component (signals, computed, localStorage)
        ├── learn-react.html      ← template (list view + reader view)
        └── learn-react.scss      ← dark theme, BEM (.lr-*)

Pita-front/
└── learning_progress.json        ← progress state shared with the scheduled task
```

### Route
Added lazily to `app.routes.ts`:
```typescript
{
  path: 'learn-react',
  loadComponent: () => import('./learn-react/learn-react').then(m => m.LearnReactComponent),
}
```

### Data layer (`learn-react-data.ts`)
Each `Lesson` object carries everything needed to render the lesson — no network calls:

```typescript
interface Lesson {
  day: number;
  title: string;
  category: 'Basics' | 'Hooks' | 'Patterns' | 'Advanced' | 'Architecture';
  file: string;              // source file(s) in the real project
  description: string;
  angularEquivalent: string; // text explanation of the Angular parallel
  angularCode: string;       // side-by-side code comparison
  keyPoints: string[];
  codeBlocks: CodeBlock[];   // { label, code }[]
  referenceUrl: string;      // authoritative external link
  referenceLabel: string;    // display text for the link
}
```

**Do not put interview questions in the data file's UI path.** They live in a separate
`interviewQuestions: string[]` field that the scheduled task can reference, but the HTML
template never renders them. The daily 12 PM session is the only place interviews happen.

### Component (`learn-react.ts`)
Uses Angular signals throughout — no RxJS, no `ngOnInit`:

```typescript
completed  = signal<Set<number>>(this.loadCompleted());  // persisted in localStorage
currentDay = signal<number>(this.loadCurrentDay());
activeDay  = signal<number | null>(null);
activeTab  = signal<'lesson' | 'angular'>('lesson');

progress       = computed(() => Math.round(completed().size / LESSONS.length * 100));
activeLesson   = computed(() => LESSONS.find(l => l.day === activeDay()) ?? null);
todayLesson    = computed(() => LESSONS.find(l => l.day === currentDay()) ?? null);
```

`markCompleted(day)` also advances `currentDay` and persists both to `localStorage`.

### Two-view template (`learn-react.html`)
- **List view**: progress header, category badges, today banner, 27-item list with week dividers
- **Reader view**: top bar (back / day badge / done button), title, description, tabs (React / Angular), key points, code blocks, reference link

`dir="rtl"` was removed after switching to English — the layout is now fully LTR.

### Styles (`learn-react.scss`)
- Dark background: `#0F172A`
- All classes prefixed `.lr-` (BEM) to avoid collisions with the rest of the portfolio
- No Persian text anywhere in SCSS

### Scheduled Task
- **ID**: `react-daily-learning`
- **Cron**: `0 12 * * *` (12:00 PM local time, every day)
- **Behavior**: English-only technical mock interview. Reads `learning_progress.json`,
  asks 3 questions about today's concept + 1-2 review questions from completed days,
  all referencing Pita-front code. Feedback is in English.
  Only the warm-up and wrap-up lines use Persian.
- **Progress file**: `/home/iman/Digipay/Pita-front/learning_progress.json`

---

## Key Decisions & Rationale

| Decision | Why |
|---|---|
| Angular component in portfolio (not React) | Portfolio IS an Angular app — no React runtime needed |
| Signals instead of RxJS | Angular 21, simpler reactive model, no subscription management |
| localStorage for persistence | No backend, zero infrastructure, works offline |
| All content in `learn-react-data.ts` | Single source of truth — easy to translate, extend, or copy for another topic |
| Separate scheduled task for interviews | Keeps the portfolio as a calm reading environment; interviews happen on demand |
| `interviewQuestions` in data but hidden in UI | Preserves the data for the scheduled task without surfacing it in the reader |
| English content + Angular comparisons | Iman is a 5-year Angular expert learning React — comparisons dramatically reduce cognitive load |
| Reference link per lesson | Lets Iman go deeper on any concept without searching; all links point to official docs |
| `dir="rtl"` removed | Switched to English — RTL was a leftover from the Persian draft |
| Nx monorepo as source material | Real production code beats toy examples; extracts motivation naturally |

---

## Category System

| Category | Color | Days | Focus |
|---|---|---|---|
| Basics | `#3B82F6` blue | 1–7 | JSX, props, state, events, lists |
| Hooks | `#8B5CF6` purple | 8–14 | useEffect, useRef, useMemo, useCallback |
| Patterns | `#10B981` green | 15–21 | Custom hooks, lifting state, composition, controlled forms |
| Advanced | `#F59E0B` amber | 22–24 | CSS-in-JSX, dynamic import, loading/error states |
| Architecture | `#EF4444` red | 25–27 | Nx monorepo, shared libs, WebSocket |

---

## Lessons Learned (Gotchas & Decisions Made Under Pressure)

### 1. The portfolio folder was not mounted
When the work began, `/home/iman/Personal/portfolio` was not accessible via the shell.
Had to use `mcp__cowork__request_cowork_directory` to mount it before any file writes.
**Rule:** Always confirm both folders are mounted before starting multi-folder work.

### 2. Persian RTL + English code blocks don't mix well
Early drafts used `dir="rtl"` on the page and mixed Persian prose with English code.
This caused code blocks to render right-to-left. Lesson: choose a language for the whole
page and stick to it. `dir="rtl"` was removed once the decision to go fully English was made.

### 3. Interview questions accidentally appeared in the lesson view
The first version put `interviewQuestions` in a rendered `<div>` in the HTML template.
After the user flagged this, the section was removed from HTML. The field remains in
the data interface so the scheduled task can use it — just not rendered in the UI.
**Rule:** Data fields and UI fields are not the same thing. Keep them decoupled.

### 4. The scheduled task was set to 10 AM first, then changed to 12 PM
Simple change, but it revealed that the cron expression and the SKILL.md prompt both
need to be updated together — one controls when it fires, the other what it does.

### 5. Context window ran out mid-task
During the English rewrite of `learn-react-data.ts` (all 27 lessons), the context window
was exhausted. The conversation was compacted and resumed. This is expected for large
data files. **Rule:** Write large data files in a single `Write` call, not iterative edits,
to minimize round-trips that consume context.

### 6. Category keys were bilingual for a while
`CATEGORY_COLORS` had Persian keys (`'پایه'`, `'الگوها'`) while some lessons already used
English (`'Hooks'`). This caused category color lookup misses. Always change both the
component's color map AND the data file's category strings in the same commit.

---

## How to Create a New Learning System for a Different Topic

Use the `/learning-plan` custom skill (see below), or follow these steps manually:

### Step 1 — Analyze the source codebase
Ask Claude to scan the target project and extract every concept related to the topic.
Group them by difficulty and interdependency. Aim for 20–30 concepts.

### Step 2 — Create the data file
Copy the structure from `learn-react-data.ts`. For each concept:
- Write 5 key points
- Write 2 code blocks from real project files (not invented examples)
- Write an Angular/React equivalent explanation (since Iman knows both)
- Add a reference URL from the official documentation

### Step 3 — Create the Angular component
Copy `learn-react/` folder, rename to `learn-<topic>/`.
Update:
- Component selector: `app-learn-<topic>`
- `CATEGORY_COLORS` to match the new topic's categories
- `categories` getter to return the new category names
- `getWeekLabel()` to return the new week titles
- SCSS prefix: change `.lr-` to something topic-specific to avoid collisions

### Step 4 — Add the route
In `app.routes.ts`:
```typescript
{
  path: 'learn-<topic>',
  loadComponent: () => import('./learn-<topic>/learn-<topic>').then(m => m.LearnTopicComponent),
}
```

### Step 5 — Create the progress file
In the source project root:
```json
{
  "startDate": "YYYY-MM-DD",
  "currentDay": 1,
  "totalDays": 27,
  "completed": [],
  "concepts": [/* array of { day, title, file } */]
}
```

### Step 6 — Set up the scheduled task
Create a daily task that:
- Reads the progress JSON
- Acts as a mock interviewer in English
- Asks 3 questions about today's concept + 1-2 from completed days
- References actual code from the source project

---

## Storage Keys (localStorage)

To avoid collision between multiple learning systems, use topic-specific keys:

```typescript
// react
const STORAGE_KEY = 'react-learning-completed';
const DAY_KEY     = 'react-learning-current-day';

// next topic (example)
const STORAGE_KEY = 'typescript-learning-completed';
const DAY_KEY     = 'typescript-learning-current-day';
```

---

## Experience Log

*Append new entries here whenever the system changes. Never edit old entries.*

---

### 2026-06-28 — Initial build (learn-react)

**What was built:**
- Analyzed Pita-front monorepo and extracted 27 React concepts
- Created `REACT_LEARNING_PLAN.md` and `learning_progress.json` in Pita-front
- Built `/learn-react` Angular route in portfolio with full lesson reader
- Added Angular comparison tab to every lesson
- Set up daily 12 PM scheduled mock interview task in English
- Translated entire system from Persian to English
- Added a reference link (react.dev / MDN / nx.dev / Pusher) to each of 27 lessons

**Key learnings:**
- Real project code as examples > toy examples for motivation and retention
- Angular signals (`signal()`, `computed()`) map almost directly to React's `useState` / `useMemo` — this comparison is the fastest path for an Angular expert learning React
- Keeping interview questions out of the reading UI creates a clean separation between self-study and assessment
- A single `Lesson` interface as the single source of truth makes translation, extension, and tooling straightforward
