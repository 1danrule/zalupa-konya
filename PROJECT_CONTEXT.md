# PROJECT CONTEXT

## Project
Quizlet-like cross-platform app

## Stack
- Flutter frontend
- Django + DRF backend
- PostgreSQL on Neon
- UI reference from friend: `reference_ui/prototype_react_app.jsx`

## Backend status
- Django backend is running
- Neon is connected
- Data is really saved to PostgreSQL
- API endpoints work:
  - `/api/sets/`
  - `/api/flashcards/`
  - `/api/audio-assets/`

## Flutter status
- Flutter project runs
- Android emulator works
- Decks screen works
- Create deck works
- DeckDetailScreen works
- Start Studying currently opens a placeholder screen: "Study mode coming soon"

## Current UI approach
- React code from `reference_ui/prototype_react_app.jsx` is used only as UI/UX reference
- Final client must be implemented in Flutter
- Do not use JSX/HTML/CSS directly

## Current next task
Implement a real `StudyScreen` in Flutter:
- load flashcards for selected deck from backend
- show one card at a time
- first show front
- then reveal back
- buttons: `Again` and `Got it`
- progress indicator
- completion screen with correct/wrong/score
- empty state if no cards exist

## Important constraints
- Do not touch auth yet
- Do not touch Keycloak yet
- Do not touch subscriptions yet
- Do not touch Cloudflare R2 yet
- Keep code beginner-friendly
- Do not rewrite the whole app