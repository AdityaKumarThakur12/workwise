# 🚄 FastTrack Tickets - Your Journey Starts with a Zoom!

## 🧹 Problem Statement
A simple yet efficient train seat reservation system, built to mimic a real-world coach seating scenario. Here's the challenge:

- A single coach contains **80 seats**.
- Seats are arranged in **rows of 7**, except the **last row which has 3** seats.
- Users can reserve up to **7 seats at once**.
- **Priority is to book in a single row** if available.
- If that’s not possible, book **nearby seats** as close together as possible.
- **No overbooking**: once a seat is taken, it can’t be booked again unless canceled or reset.
- Users can book repeatedly until all seats are full.
- Includes full **user authentication** (login and signup).

## 💡 Solution Features
- **Modern UI** with **Framer Motion** animations and a beautiful canvas-based train animation as a loading screen.
- **Dynamic canvas** showing two animated trains moving across stylized tracks.
- **Smart booking logic** to:
  - Detect availability in the same row first.
  - Fall back to the nearest possible cluster of seats if needed.
- Built-in **authentication system** to allow secure seat reservations per user.

## 🛠️ Tech Stack
### Backend
- **Node.js** + **Express.js** – Server & API routes
- **MongoDB** – Database for users and seats
- **JWT** – Authentication token management

### Frontend
- **React.js** – Component-based UI
- **Framer Motion** – Smooth, elegant animations
- **Canvas API** – For animated visuals

## 🚜 Folder Structure

### Backend
```
backend/
├── config/
│   └── db.js
├── Controllers/
│   ├── authController.js
│   └── bookingController.js
├── Middlewares/
│   └── auth.js
├── Models/
│   ├── seat.js
│   └── user.js
├── Routes/
│   ├── auth.js
│   └── booking.js
├── .env
├── package.json
├── package-lock.json
└── server.js
```

### Frontend
```
src/
├── assets/
│   └── react.svg
├── Components/
│   ├── auth/
│   │   ├── login.jsx
│   │   └── signup.jsx
│   ├── booking/
│   │   └── seat.jsx
│   ├── loading.jsx
│   └── navbar.jsx
├── contexts/
│   └── authContext.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## 🚀 How to Run
1. Clone the repo
2. Go into `backend/` and run:
   - `npm install`
   - Set up `.env` with your MongoDB URI and JWT secret
   - `npm start`
3. Go into the frontend directory (`src/` assumed to be inside a React Vite project)
   - `npm install`
   - `npm run dev`

## 📌 TODO / Roadmap
- [ ] Add seat map UI for visual selection
- [ ] Enable seat cancellation/reset by user
- [ ] Admin dashboard to view all bookings
- [ ] Mobile responsiveness tweaks
- [ ] Real-time updates on seat availability

## ✨ Showcase
A blazing-fast and aesthetically animated train ticket booking experience that’s both practical and fun to build.

---
Made with ❤️ and caffeine by Aditya

