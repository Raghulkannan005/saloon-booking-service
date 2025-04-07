# Glamour Salon Management System Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Frontend Structure](#frontend-structure)
   - [Components](#components)
   - [Pages](#pages)
   - [Services](#services)
   - [Styling](#styling)
4. [Backend Structure](#backend-structure)
   - [API Routes](#api-routes)
   - [Database Models](#database-models)
   - [Controllers](#controllers)
5. [API Documentation](#api-documentation)
6. [Installation Guide](#installation-guide)
7. [Development Guide](#development-guide)
8. [Deployment Instructions](#deployment-instructions)
9. [Feature Guides](#feature-guides)
   - [Service Management](#service-management)
   - [Booking Management](#booking-management)
10. [Troubleshooting](#troubleshooting)
11. [Future Enhancements](#future-enhancements)

## Introduction

The Glamour Salon Management System is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides salon owners with an intuitive interface to manage their services and client bookings. The application features a responsive design with a clean and modern UI, allowing it to be used on various devices.

Key features include:
- Management of salon services (CRUD operations)
- Booking appointment management
- Responsive design for mobile and desktop use
- Real-time notifications using React Toastify
- Clean, intuitive UI with accessible controls

## Architecture Overview

The application follows a client-server architecture with a clear separation between the frontend and backend:

```
Glamour Salon Service Management
├── Frontend (React + Vite)
│   ├── Components
│   ├── Pages
│   ├── Services (API interaction)
│   └── Styling
└── Backend (Express + MongoDB)
    ├── Routes
    ├── Models
    └── Controllers
```

**Technology Stack:**

- **Frontend:**
  - React 18.2.0 (with Vite for fast development)
  - React Router 6.15.0 for navigation
  - React DatePicker for appointment scheduling
  - React Toastify for notifications
  - Axios for API communication
  - CSS for styling

- **Backend:**
  - Node.js with Express 4.18.2
  - MongoDB with Mongoose 7.5.0 ODM
  - CORS for cross-origin support
  - RESTful API architecture

## Frontend Structure

The frontend is built with React and uses a component-based architecture to maintain a clean, modular codebase.

### Components

The application features several reusable components:

1. **Navbar (Navbar.jsx)**
   - Main navigation component
   - Provides links to different sections of the application
   - Responsive design with mobile-friendly navigation

2. **Modal Components**
   - For service creation/editing
   - For booking appointments

3. **Service Card Components**
   - Display service information in a card layout
   - Include actions for editing and deleting

### Pages

The application has three main pages:

1. **Home Page (Home.jsx)**
   - Landing page with featured services
   - Hero section with call-to-action buttons
   - About section with salon information

2. **Services Page (Services.jsx)**
   - Displays all available salon services
   - Interface for managing services (create, edit, delete)
   - Modal forms for service data entry

3. **Bookings Page (Bookings.jsx)**
   - Displays all bookings
   - Interface for managing appointments
   - Date and time selection using React DatePicker
   - Service selection from available services

### Services

The frontend communicates with the backend through service modules:

1. **serviceService.js**
   - Handles all API calls related to salon services
   - Methods for CRUD operations on services

2. **bookingService.js**
   - Handles all API calls related to bookings
   - Methods for CRUD operations on bookings

### Styling

The application uses a custom CSS approach:

1. **Global Styles (index.css)**
   - CSS variables for colors, shadows, and border radius
   - Base typography and reset styles
   - Layout variables

2. **Component-specific CSS**
   - Each component has its own CSS file for specific styling
   - Mobile-responsive design using media queries

3. **App-wide Utils (App.css)**
   - Utility classes for buttons, cards, forms, etc.
   - Modal styling and grid layouts

## Backend Structure

The backend follows a REST API architecture using Express.js and MongoDB.

### API Routes

1. **Service Routes (serviceRoutes.js)**
   - GET `/api/services` - Retrieve all services
   - GET `/api/services/:id` - Retrieve a specific service
   - POST `/api/services` - Create a new service
   - PUT `/api/services/:id` - Update an existing service
   - DELETE `/api/services/:id` - Delete a service

2. **Booking Routes (bookingRoutes.js)**
   - GET `/api/bookings` - Retrieve all bookings
   - GET `/api/bookings/:id` - Retrieve a specific booking
   - POST `/api/bookings` - Create a new booking
   - PUT `/api/bookings/:id` - Update an existing booking
   - DELETE `/api/bookings/:id` - Delete a booking

### Database Models

1. **Service Model (Service.js)**
   - name: String (required)
   - price: Number (required)
   - duration: Number (required) - in minutes
   - description: String (required)
   - timestamps: true (tracks creation and update times)

2. **Booking Model (Booking.js)**
   - customerName: String (required)
   - phone: String (required)
   - selectedService: ObjectId (reference to Service model)
   - date: Date (required)
   - timestamps: true (tracks creation and update times)

## API Documentation

### Services API

#### GET /api/services
- **Description:** Retrieve all services
- **Authentication:** None
- **Response:** Array of service objects
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Haircut",
      "price": 30,
      "duration": 45,
      "description": "Professional haircut with styling",
      "createdAt": "2023-08-10T12:00:00.000Z",
      "updatedAt": "2023-08-10T12:00:00.000Z"
    },
    ...
  ]
  ```

#### GET /api/services/:id
- **Description:** Retrieve a specific service
- **Parameters:** id - Service ID
- **Authentication:** None
- **Response:** Service object
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "Haircut",
    "price": 30,
    "duration": 45,
    "description": "Professional haircut with styling",
    "createdAt": "2023-08-10T12:00:00.000Z",
    "updatedAt": "2023-08-10T12:00:00.000Z"
  }
  ```

#### POST /api/services
- **Description:** Create a new service
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "name": "Haircut",
    "price": 30,
    "duration": 45,
    "description": "Professional haircut with styling"
  }
  ```
- **Response:** Created service object

#### PUT /api/services/:id
- **Description:** Update an existing service
- **Parameters:** id - Service ID
- **Authentication:** None
- **Request Body:** (any fields to update)
  ```json
  {
    "price": 35,
    "description": "Updated description"
  }
  ```
- **Response:** Updated service object

#### DELETE /api/services/:id
- **Description:** Delete a service
- **Parameters:** id - Service ID
- **Authentication:** None
- **Response:**
  ```json
  {
    "message": "Service deleted successfully"
  }
  ```

### Bookings API

#### GET /api/bookings
- **Description:** Retrieve all bookings
- **Authentication:** None
- **Response:** Array of booking objects with populated service information
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "customerName": "John Doe",
      "phone": "123-456-7890",
      "selectedService": {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Haircut",
        "price": 30,
        "duration": 45,
        "description": "Professional haircut with styling"
      },
      "date": "2023-08-15T14:00:00.000Z",
      "createdAt": "2023-08-10T12:00:00.000Z",
      "updatedAt": "2023-08-10T12:00:00.000Z"
    },
    ...
  ]
  ```

Similar documentation continues for other booking endpoints.

## Installation Guide

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd saloon-service-management
   ```

2. **Set up the backend**
   ```
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   ```

4. **Set up the frontend**
   ```
   cd ../frontend
   npm install
   ```

5. **Start the application**
   - Backend: `npm run dev` (from the backend directory)
   - Frontend: `npm run dev` (from the frontend directory)

6. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

## Development Guide

### Frontend Development

The frontend is built with React and uses Vite for fast development. Here are some guidelines for development:

1. **Component Structure**
   - Create reusable components in the `components` directory
   - Use props for passing data to components
   - Follow the existing styling patterns

2. **State Management**
   - Use React hooks (useState, useEffect) for state management
   - Implement context if needed for global state

3. **API Integration**
   - Add new API functions in the corresponding service files
   - Use async/await for handling promises
   - Handle errors with try/catch blocks

4. **Styling**
   - Create a CSS file for each component/page
   - Use the existing CSS variables for consistency
   - Follow mobile-first approach for responsive design

### Backend Development

1. **API Endpoints**
   - Follow RESTful principles
   - Add new routes in the corresponding route files
   - Use appropriate HTTP methods (GET, POST, PUT, DELETE)

2. **Database Models**
   - Define schemas in the `models` directory
   - Use validation for required fields
   - Add indexes for frequently queried fields

3. **Error Handling**
   - Use try/catch blocks for async operations
   - Return appropriate HTTP status codes
   - Provide meaningful error messages

## Deployment Instructions

### Backend Deployment

1. **Prepare for production**
   - Ensure environment variables are set correctly
   - Add production logging if needed

2. **Deploy to a hosting service (e.g., Heroku, Render, or AWS)**
   - Set up MongoDB Atlas for the database
   - Configure environment variables on the hosting platform
   - Deploy the backend code

### Frontend Deployment

1. **Build the frontend**
   ```
   cd frontend
   npm run build
   ```

2. **Deploy the build files**
   - Use a static site hosting service (e.g., Netlify, Vercel)
   - Configure the backend API URL in production

3. **Set up CORS on the backend**
   - Ensure the backend allows requests from the frontend domain

## Feature Guides

### Service Management

The Service Management feature allows salon administrators to manage the services offered by the salon.

#### Adding a Service
1. Navigate to the Services page
2. Click the "Add New Service" button
3. Fill in the service details (name, price, duration, description)
4. Click "Add Service"

#### Editing a Service
1. On the Services page, find the service you want to edit
2. Click the edit icon
3. Update the service details
4. Click "Update Service"

#### Deleting a Service
1. On the Services page, find the service you want to delete
2. Click the delete icon
3. Confirm the deletion in the confirmation dialog

### Booking Management

The Booking Management feature allows administrators to manage client appointments.

#### Creating a Booking
1. Navigate to the Bookings page
2. Click the "New Booking" button
3. Fill in the customer details (name, phone)
4. Select a service from the dropdown
5. Choose the appointment date and time
6. Click "Create Booking"

#### Editing a Booking
1. On the Bookings page, find the booking you want to edit
2. Click the edit icon
3. Update the booking details
4. Click "Update Booking"

#### Deleting a Booking
1. On the Bookings page, find the booking you want to delete
2. Click the delete icon
3. Confirm the deletion in the confirmation dialog

## Troubleshooting

### Common Issues

1. **Backend connection issues**
   - Ensure MongoDB is running and accessible
   - Check the MONGO_URI in the .env file
   - Verify that the backend server is running on the expected port

2. **Frontend API calls failing**
   - Check browser console for errors
   - Ensure the backend API is running
   - Verify that CORS is properly configured

3. **Styling inconsistencies**
   - Check if CSS variables are correctly used
   - Ensure the component's CSS file is imported
   - Test on different screen sizes for responsive design issues

## Future Enhancements

Potential enhancements for future versions:

1. **Authentication and Authorization**
   - User registration and login
   - Role-based access control (admin, staff, client)

2. **Advanced Booking Features**
   - Email/SMS notifications for appointments
   - Recurring appointments
   - Staff assignment to bookings

3. **Dashboard and Analytics**
   - Revenue reports
   - Service popularity analytics
   - Customer statistics

4. **Client Portal**
   - Client login for self-service booking
   - Profile management
   - Booking history

5. **Inventory Management**
   - Product tracking
   - Low stock alerts
   - Integration with service usage