# ☁️ Cloud Room Gallery

A beautiful, cloud-backed file sharing application built with the **MERN Stack** (MongoDB, Express, React, Node.js). Designed for real-time collaboration with a stunning "Light & Bright" Glassmorphism UI.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Key Features

- **🏠 Room-Based Sharing**: Create unique, secure rooms (e.g., `A1B2C3`) to share files instantly.
- **🎨 Glassmorphism UI**: A premium, modern interface featuring frosted glass panels, vibrant mesh gradients, and smooth animations.
- **☁️ Cloud Storage**: Powered by **MongoDB Atlas** for reliable, persistent data storage.
- **🖼️ Built-in Image Editor**: Rotate, crop, and apply filters (B&W, Sepia, Vivid) to images directly in the browser.
- **📂 Drag & Drop Uploads**: Seamlessly upload images and PDFs.
- **📱 Responsive Design**: Optimized for all devices, from desktops to mobiles.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Vanilla CSS (Variables & Layouts), Lucide-React (Icons), React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose Schema).
- **Tools**: `dotenv` for config, `cors` for security.

## 🚀 Getting Started

1.  **Start the Backend**:
    ```bash
    npx nodemon server/server.js
    ```
2.  **Start the Frontend**:
    ```bash
    npm run dev
    ```
3.  **Open in Browser**:
    Navigate to `http://localhost:5173` (or the port shown in terminal).

## 📄 API Endpoints

- `POST /api/create-room`: Generates a new room code.
- `GET /api/room/:code`: Fetches all files in a room.
- `POST /api/upload/:code`: Uploads a file to the specific room.

---
*Built for the Hackathon 2026.*
