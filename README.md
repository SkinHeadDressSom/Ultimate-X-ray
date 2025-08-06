# Ultimate-X-ray

AI-powered X-ray image analysis system for hospitals

## Tech Stack

**Frontend**
- React 19
- Redux Toolkit
- Tailwind CSS
- Material UI
- Fabric.js (for annotation)
- DICOM Parser

**Backend**
- Node.js (Express) - Auth & Data services
- Python (FastAPI) - AI Detection service
- PostgreSQL
- Kong API Gateway

## Installation

### Requirements
- Docker & Docker Compose
- Node.js 18+
- Python 3.8+

### Backend

1. Copy config files
```bash
cp Backend/services/auth/.env.example Backend/services/auth/.env
cp Backend/services/fetch-data/.env.example Backend/services/fetch-data/.env
```

2. Edit environment variables in .env files

3. Run the system
```bash
cd Backend
docker-compose up
```

Services will run on:
- Kong API Gateway: http://localhost:8000
- Auth Service: http://localhost:3001
- Fetch Data Service: http://localhost:3002
- AI Detection Service: http://localhost:3010
- PostgreSQL: localhost:5432

### Frontend

```bash
cd Frontend
npm install
npm start
```

Website will open at http://localhost:3000

## Project Structure

```
Backend/
├── services/
│   ├── auth/          # Authentication service
│   ├── fetch-data/    # Data management service
│   └── ai-detection/  # AI analysis service
├── docker-compose.yml
└── schema.sql         # Database schema

Frontend/
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Web pages
│   ├── redux/         # State management
│   └── hooks/         # Custom hooks
```

## Key Features

- User authentication and registration
- X-ray image upload and management
- AI-powered image analysis
- Image annotation
- Report generation
- Patient data search
