# 2026-03-31 Auto-Translate Feature Design

## Goal
Implement a manual "Auto-Translate" feature in the Programs Dashboard to automatically fill English (EN) fields from Indonesian (ID) input.

## Architecture
- **Type**: Manual trigger (button) via Backend API.
- **Backend Integration**: 
  - Add `POST /api/utils/translate` in `server.js`.
  - Logic: First check the mapping in `backend/auto_translate.js`.
  - Fallback: Use a lightweight dynamic translation provider (e.g., `google-translate-api-x` or a public fallback) for new text.
- **Frontend Integration**:
  - Target: `ProgramsPage.jsx`.
  - UI: Add a small `Languages` (Lucide) icon button next to labels for Title, Category, Location, Target, and Narrative.
  - State: Update local React state with the translated string.

## Technical Details
- **Backend Endpoint**:
  ```javascript
  app.post('/api/utils/translate', authMiddleware, async (req, res) => {
    const { text, target = 'en' } = req.body;
    // 1. Check local dictionary
    // 2. Dynamic translate if missing
    // 3. Return { translatedText }
  });
  ```
- **Frontend Hook**:
  - Add `handleTranslate(fieldName)` function in `ProgramsPage`.
  - Updates `form[fieldName + '_en']` or `form[fieldMaps[fieldName]]`.

## Success Criteria
- [ ] Clicking the translate button fills the corresponding EN field.
- [ ] Backend falls back to AI/Service if dictionary doesn't match.
- [ ] UI remains clean, simple, and premium.
- [ ] Performance remains optimal (no heavy dependencies).

## Error Handling
- Show toast/alert if translation service is unavailable.
- Retain existing EN text if translation fails.
