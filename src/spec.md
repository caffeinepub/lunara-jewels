# Specification

## Summary
**Goal:** Make the Lunara Jewels rule-based chatbot select the most relevant intent for a user’s message and respond in a more conversational, question-focused way.

**Planned changes:**
- Update intent matching in `frontend/src/utils/chatbot.ts` to use deterministic scoring that prefers more specific/longer matches, handles multiple matches, and avoids broad-intent over-triggering (e.g., “shop”).
- Make intent matching tolerant of punctuation and extra whitespace, and add a confidence threshold so the bot asks 1–2 clarifying questions when it can’t confidently match an intent.
- Rewrite/refactor chatbot responses in `frontend/src/utils/chatbot.ts` so answers are direct first, then optionally include a brief follow-up question plus 2–4 topic-relevant quick replies without implying unsupported site capabilities.
- Update `/chat` helper copy in `frontend/src/pages/ChatPage.tsx` to encourage specific questions, set expectations about brief clarifying follow-ups, and point users to Contact for out-of-scope requests.

**User-visible outcome:** The chatbot more consistently answers the specific question asked (or asks a quick clarifying question when needed), uses a friendlier conversational tone, and shows quick replies that match the user’s topic; the Chat page better explains how to get the best answers and when to use Contact.
