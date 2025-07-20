# Invoicing Application

A full-stack, demoable invoicing application built with React, Node.js/Express, PostgreSQL, and OpenRouter AI integration.

---

## Table of Contents
- [Project Setup Instructions](#project-setup-instructions)
- [Time Spent (12 Hours)](#time-spent-12-hours)
- [Features Completed](#features-completed)
- [Features Not Completed](#features-not-completed)
- [Thought Process & Prioritization](#thought-process--prioritization)
- [Next Steps (If Given More Time)](#next-steps-if-given-more-time)
- [Known Limitations & Bugs](#known-limitations--bugs)

---

## Project Setup Instructions

### 1. Clone the Repository
```sh
git clone <repo-url>
cd 'main project root'
```

### 2. Backend Setup
```sh
cd server
cp env.sample .env  # Edit .env with your DB and OpenRouter API key
npm install
# Start PostgreSQL via Docker Compose (ensure Docker is running)
docker-compose up -d
# Sync DB tables
node src/db/sync.js
# Start backend server
node src/index.js
```

### 3. Frontend Setup (Open new terminal)
```sh
cd client
npm install
npm start
```

### 4. Access the App
- REACT APP: [http://localhost:3000](http://localhost:3000)

### 5. Authentication
- Login as admin: 
  - **Username:** `admin`
  - **Password:** `admin`

### 6. AI-Powered Query
- Go to the "AI Query" page in the app.
- Enter a business question (e.g., "Which clients are at risk of churn?").
- The AI will analyze your data and provide an answer.
- **Requires a valid OpenRouter API key in your backend `.env`.**

---

## Time Spent (12 Hours)
- **Backend setup & DB models (1.5h):** Project structure, Sequelize models, Docker/Postgres config.
- **API endpoints & DB integration (3h):** CRUD for clients/invoices, schema, validation.
- **Frontend scaffolding & routing (1h):** React app setup, MUI, React Router, folder structure.
- **Client management UI (1.5h):** List, add, edit, delete, form validation.
- **Invoice management UI (1.5):** List, create, mark paid/unpaid, itemized form, total calc.
- **PDF export (0.5h):** Integrate jsPDF, export button, table formatting.
- **Dark mode & theme toggle (0.5h):** MUI ThemeProvider, toggle button, testing.
- **Mock authentication (0.5h):** Login page, state, route protection.
- **AI-powered query integration (2h):** OpenRouter API, backend endpoint, frontend UI, error handling.
- **Total:** 12.5 hours

---

## Features Completed
- Invoice creation (autonumber, validation, itemized, total auto-calc)
- Invoice list view (table, filter, status, client info)
- Mark invoice as paid/unpaid
- Client management (add, edit, delete, associate)
- Mock authentication (admin/admin)
- Invoice PDF export
- Dark mode toggle
- AI-powered query (OpenRouter LLM integration)

---

## Features Not Completed
- Email invoice (mock/real)
- Multi-currency support
- User roles/permissions
- Dashboard metrics/charts
- Import/export CSV
- Audit log, autosave, templates
- Real payment tracking

---

## Thought Process & Prioritization
- **Core first:** Focused on data flow, CRUD, and validation for invoices/clients.
- **Rapid UI:** Used MUI for fast, elegant, and responsive design.
- **Demoable:** Ensured all flows are testable and demo-ready.
- **Advanced features:** Added PDF, dark mode, and AI after core was stable.
- **Mock auth:** Used for speed and simplicity.
- **AI bonus:** Prioritized for high-impact demo value.

---

## Next Steps (If Given More Time)
- Add dashboard with metrics and charts
- Implement real authentication and user roles
- Add email sending and multi-currency support
- Improve AI prompt engineering and data summarization
- Add import/export, audit log, and autosave
- Enhance error handling and user feedback

---

## Known Limitations & Bugs
- AI query limited by OpenAPI quota and data size, that is why I changed it to OpenRouter API
- No real email or payment integration
- No persistent user sessions (mock auth only)
- Minimal error handling for demo speed
- Not fully responsive

---