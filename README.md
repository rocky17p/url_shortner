# 🔗 URL Shortener

🌐 **Live Demo:** [https://url-shortner-rishi.vercel.app](https://urlshortner.rishipatwa.me)

A modern, full-stack URL shortening application built with **Node.js**, **Express 5**, **React 19**, and **MongoDB**. Features user authentication, click tracking, and a sleek responsive UI.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

- **🔐 User Authentication** – Secure signup/login with JWT-based cookie authentication
- **⚡ Instant URL Shortening** – Generate short, unique links using nanoid
- **📊 Click Analytics** – Track visit history with timestamps for each shortened URL
- **🎨 Modern UI** – Clean, responsive React frontend with smooth animations
- **🚀 Vercel Ready** – Configured for seamless deployment to Vercel

## 🛠️ Tech Stack

### Backend
- **Express 5** – Fast, minimalist web framework
- **MongoDB + Mongoose** – Database and ODM
- **JWT** – Secure token-based authentication
- **Cookie Parser** – HTTP cookie handling

### Frontend
- **React 19** – Modern UI library
- **React Router 7** – Client-side routing
- **Vite 7** – Next-generation frontend tooling

## 📁 Project Structure

```
URL-SHORTNER/
├── index.js                 # Express server entry point
├── package.json
├── vercel.json              # Vercel deployment config
├── src/
│   ├── config/              # Database configuration
│   ├── controllers/         # Route handlers
│   ├── middlewares/         # Auth middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   └── services/            # Business logic
└── frontend/
    ├── src/
    │   ├── pages/           # React page components
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # React entry point
    └── dist/                # Production build
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/url-shortner.git
   cd url-shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/short-url
   JWT_SECRET=your_jwt_secret_key
   PORT=8001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   This starts both the backend (port 8001) and frontend (Vite dev server) concurrently.

5. **Build for production**
   ```bash
   npm run build
   ```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Create new account |
| POST | `/user/login` | Login and get auth cookie |
| POST | `/user/logout` | Clear auth cookie |
| GET | `/user/me` | Get current user info |

### URL Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/url` | Create shortened URL |
| GET | `/url` | Get all user's URLs |
| GET | `/:shortID` | Redirect to original URL |

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/rocky17p">Rishi Patwa</a>
</p>
