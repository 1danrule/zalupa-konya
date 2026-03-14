# Quizlet-like Backend (Django + DRF)

Minimal but extensible backend for a Quizlet-like app.

## Stack

- Django
- Django REST Framework
- PostgreSQL (via `DATABASE_URL`)
- `django-environ` for configuration
- `django-cors-headers`
- Ready for future:
  - Flutter client
  - Keycloak auth
  - Cloudflare R2 for audio files
  - Deployment on Render.com

## Setup

### 1. Clone and enter the project

```bash
git clone <your-repo-url> backend
cd backend