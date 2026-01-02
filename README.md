# 📇 Contact Manager - MERN Stack

A robust, secure, and visually stunning **Contact Management Application** built with the MERN stack. Designed for efficient personal network management with a focus on UI/UX excellence and code quality.

![Dashboard Preview](/C:/Users/Anjali%20Varma/.gemini/antigravity/brain/b8e13117-61a7-4027-a7f6-92131fa319bb/uploaded_image_1767393583283.png)

## 🚀 Features

### Core Functionality
-   **🔐 Secure Authentication:** Full User Registration and Login flow using JWT (JSON Web Tokens) & Bcrypt.
-   **📝 CRUD Operations:** Create, Read, Update, and Delete contacts seamlessly.
-   **⚡ Real-time Validation:** Instant visual feedback on forms (client-side) combined with robust server-side checks.
-   **📱 Fully Responsive:** Optimized for Desktop, Tablet, and Mobile devices.

### UI/UX Highlights
-   **🎨 Glassmorphism Design:** Modern, translucent UI components with backdrop blurs.
-   **✨ Animations:** Smooth page transitions, hover effects, and animated background blobs.
-   **🔔 Custom Alerts:** Built-in modal popups for error handling (e.g., "User already exists").
-   **🌘 Dark Mode aesthetics:** Sleek dark-themed interface with vibrant gradient accents.

---

## 🛠️ Tech Stack

### Frontend
-   **React.js (Vite):** Fast, modern frontend framework.
-   **Tailwind CSS:** Utility-first CSS for rapid, custom styling.
-   **React Router:** SPA navigation (Landing, Login, Register, Dashboard).
-   **Axios:** HTTP client for API requests.
-   **React Icons:** Vector icons for a polished look.

### Backend
-   **Node.js & Express.js:** RESTful API server.
-   **MongoDB & Mongoose:** NoSQL database with strict Schema validation.
-   **JWT:** Stateless authentication mechanism.
-   **Bcrypt:** Password hashing for security.

---

## ⚙️ Installation & Setup

Follow these steps to run the application locally.

### Prerequisites
-   Node.js (v14+)
-   MongoDB (Local or Atlas URI)

### 1. clone the repository
```bash
git clone https://github.com/anjali04853/FULL_STACK_DEVELOPER.git
cd FULL_STACK_DEVELOPER
```

---

## 🚀 Deploying to Render (Single Web Service)

This project is configured for a unified deployment on Render.

### Render Configuration:
1.  **Service Type:** Web Service
2.  **Environment:** `Node`
3.  **Build Command:** `npm run build`
4.  **Start Command:** `npm start`
5.  **Environment Variables:**
    -   `MONGODB_URI`: Your MongoDB Atlas connection string.
    -   `JWT_SECRET`: A secure random string for token encryption.

### Deployment Process:
-   Render will install dependencies in both `backend` and `frontend`.
-   It will build the React app into `frontend/dist`.
-   The Node server will then serve the API and the static frontend from that folder.

---

### 2. Backend Setup
Navigate to the backend folder and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

Start the server:
```bash
npm start
```
*Server runs on port 5000.*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies.
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```
*App runs on http://localhost:5173*.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and get Token | ❌ |
| `GET` | `/api/auth/user` | Get logged-in user details | ✅ |

### Contacts
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/contacts` | Get all contacts for user | ✅ |
| `POST` | `/api/contacts` | Create a new contact | ✅ |
| `PUT` | `/api/contacts/:id` | Update a contact | ✅ |
| `DELETE` | `/api/contacts/:id` | Delete a contact | ✅ |

---

## 📂 Project Structure

```
contact-manager/
├── backend/                # Express Server & API
│   ├── config/             # Database configuration
│   ├── middleware/         # Auth & validation middleware
│   ├── models/             # Mongoose Models (User, Contact)
│   ├── routes/             # API Routes
│   └── server.js           # Entry point
│
├── frontend/               # React Client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth Context Provider
│   │   ├── pages/          # Full Page Views
│   │   └── index.css       # Tailwind & Global Styles
│   └── vite.config.js      # Vite Configuration
│
└── README.md               # Documentation
```

---

## 👨‍💻 Author

**Anjali Varma**
*Full Stack Developer*

---
*Built for the Contact Management Web App Technical Assessment.*
