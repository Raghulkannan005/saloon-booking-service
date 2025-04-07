# Glamour Salon Service Management

A colorful MERN (MongoDB, Express, React, Node.js) application for managing salon services and bookings.

## Features

- Service management (create, read, update, delete)
- Booking management (create, read, update, delete)
- Responsive UI with playful design
- No login required

## Tech Stack

### Frontend
- React with Vite
- React Router for navigation
- Axios for API requests
- React DatePicker for scheduling
- React Toastify for notifications
- CSS for styling

### Backend
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- RESTful API

## Project Structure

```
salon-service-management/
├── backend/                # Express + MongoDB server
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
│
└── frontend/               # React + Vite client
    ├── public/             # Static assets
    ├── src/                # React source code
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── services/       # API service functions
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    └── package.json        # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository

2. Install backend dependencies
```
cd salon-service-management/backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server
```
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Services

- GET `/api/services` - Get all services
- GET `/api/services/:id` - Get a specific service
- POST `/api/services` - Create a new service
- PUT `/api/services/:id` - Update a service
- DELETE `/api/services/:id` - Delete a service

### Bookings

- GET `/api/bookings` - Get all bookings
- GET `/api/bookings/:id` - Get a specific booking
- POST `/api/bookings` - Create a new booking
- PUT `/api/bookings/:id` - Update a booking
- DELETE `/api/bookings/:id` - Delete a booking
