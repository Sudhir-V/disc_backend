# DISC Assessment Backend API

Backend service for the DISC Assessment application built with Node.js, Express, and MongoDB.

## 🚀 Swagger API Documentation

Once the server is running, the interactive Swagger UI is available at:
- **Swagger UI:** [http://localhost:10000/api-docs](http://localhost:10000/api-docs) (or aliases `/swagger`, `/docs`)
- **OpenAPI JSON Spec:** [http://localhost:10000/api-docs.json](http://localhost:10000/api-docs.json)

You can explore all endpoints and test authenticated requests directly using the **Authorize** button with a Bearer JWT token.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

### 2. Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=10000
```

### 3. Installation
```bash
npm install
```

### 4. Running the Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

---

## 📚 API Endpoints Summary

| Module | Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/send-otp` | Send SMS OTP | Public |
| **Auth** | `POST` | `/auth/verify-otp` | Verify OTP & receive JWT | Public |
| **Auth** | `POST` | `/auth/retry-otp` | Resend OTP | Public |
| **User** | `GET` | `/user/profile/:userId` | Get user profile | Bearer Token |
| **Assessment** | `GET` | `/assessment/start/:userId` | Get randomized question set | Bearer Token |
| **Assessment** | `POST` | `/assessment/submit/:userId` | Submit completed assessment | Bearer Token |
| **Assessment** | `POST` | `/assessment/save-progress/:userId` | Auto-save answer progress | Bearer Token |
| **Assessment** | `GET` | `/assessment/progress/:userId/:setId` | Fetch saved draft answers | Bearer Token |
| **Assessment** | `GET` | `/assessment/result/:userId` | Fetch assessment results | Bearer Token |
| **Assessment** | `GET` | `/assessment/status/:userId` | Check completion status | Bearer Token |
| **Admin** | `GET` | `/admin/users/report` | All user reports | Admin Token |
| **Admin** | `GET` | `/admin/users/export/xlsx` | Export to Excel | Admin Token |
| **Admin** | `GET` | `/admin/users/export/pdf` | Export to PDF | Admin Token |
| **Admin** | `POST` | `/admin/settings/toggle-results` | Toggle result visibility | Admin Token |
| **Admin** | `GET` | `/admin/settings/results-status` | Get result visibility status | Public |