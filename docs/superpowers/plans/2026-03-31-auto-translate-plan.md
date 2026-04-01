# Auto-Translate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a manual "Translate to English" button in the Programs Dashboard to auto-fill EN fields via a backend API.

**Architecture:**
- Backend: Endpoint `/api/utils/translate` in `server.js` using a dictionary + lightweight external fetch.
- Frontend: `Translate` button component integrated into `ProgramsPage.jsx` form labels.

**Tech Stack:** Node.js, Express, React, Tailwind, Jest, Supertest.

---

### Task 1: Test Environment Setup

**Files:**
- Modify: `backend/package.json`
- Create: `backend/tests/setup.js`

- [ ] **Step 1: Install testing dependencies**
Run: `npm install --save-dev jest supertest` in `backend/`
- [ ] **Step 2: Add test script to package.json**
Add `"test": "jest"` to `scripts`.
- [ ] **Step 3: Commit**
`git add package.json && git commit -m "chore: setup jest for TDD"`

### Task 2: Backend Translation Utility (TDD)

**Files:**
- Create: `backend/utils/translator.js`
- Create: `backend/tests/translator.test.js`

- [ ] **Step 1: Write failing test for local dictionary lookup**
```javascript
const { translateText } = require('../utils/translator');
test('translates "Penanaman" to "Planting" using dictionary', async () => {
    const result = await translateText('Penanaman');
    expect(result).toBe('Planting');
});
```
- [ ] **Step 2: Run test and verify it fails**
Run: `npm test backend/tests/translator.test.js`
- [ ] **Step 3: Implement `translateText` using `auto_translate.js` mapping**
- [ ] **Step 4: Run test and verify it passes**
- [ ] **Step 5: Write failing test for dynamic (AI/Service) translation**
- [ ] **Step 6: Implement lightweight fetch fallback**
- [ ] **Step 7: Commit**

### Task 3: Backend API Endpoint (TDD)

**Files:**
- Modify: `backend/server.js`
- Create: `backend/tests/api.test.js`

- [ ] **Step 1: Write failing test for `POST /api/utils/translate`**
- [ ] **Step 2: Run test and verify it fails**
- [ ] **Step 3: Implement endpoint in `server.js`**
- [ ] **Step 4: Run test and verify it passes**
- [ ] **Step 5: Commit**

### Task 4: Frontend UI Integration

**Files:**
- Modify: `src/pages/dashboard/ProgramsPage.jsx`

- [ ] **Step 1: Implement `handleTranslate` function**
Calls the new API and updates form state.
- [ ] **Step 2: Add `Translate` button next to ID labels**
Using Lucide `Languages` or `Wand2` icon.
- [ ] **Step 3: Manual Verification**
Open dashboard, type "Penanaman", click button, verify "Planting" appears in EN field.
- [ ] **Step 4: Commit**
