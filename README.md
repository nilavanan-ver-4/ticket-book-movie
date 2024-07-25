# Movie Ticket Booking System

This is a full-stack online movie ticket booking system built with React for the frontend and Node.js, Express, and MongoDB for the backend.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Components](#frontend-components)
- [License](#license)

## Features

- User and Theatre registration and login
- Movie listing and search functionality
- Movie details view
- Ticket booking and booking history
- Feedback submission and viewing
- Theatre management (add/update shows, view booking history, view feedback)

## Project Structure
```
TICKET-BOOK-MOVIE/
├── __pycache__/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   │   └── BookingService.js
│   ├── routes/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
│   └── mov.json
├── json_process.py
├── mov.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/movie-ticket-booking-system.git
   cd movie-ticket-booking-system
   ```
2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Run Frontend**
 ```bash
    cd ../src
    npm install
 ```


## Usage

1. **Create environment variables:**

   - In the `backend` directory, create a `.env` file and add your MongoDB connection string and other environment variables:

     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     
     ```

2. **Run the backend:**

   - Navigate to the `backend` directory and run:

     ```bash
     npm run dev
     ```

3. **Run the frontend:**

   - Navigate to the `src` directory and run:

     ```bash
     npm start
     ```

## API Endpoints

### Authentication

- **Register User**
  - **URL:** `/api/auth/register`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "fullName": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "city": "string",
      "address": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Login User**
  - **URL:** `/api/auth/login`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "string"
    }
    ```

- **Get User Data**
  - **URL:** `/api/auth/user`
  - **Method:** `GET`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer token"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "string",
      "fullName": "string",
      "username": "string",
      "email": "string",
      "city": "string",
      "address": "string"
    }
    ```

- **Update User Data**
  - **URL:** `/api/auth/user`
  - **Method:** `PUT`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer token"
    }
    ```
  - **Request Body:**
    ```json
    {
      "fullName": "string",
      "city": "string",
      "address": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "string",
      "fullName": "string",
      "username": "string",
      "email": "string",
      "city": "string",
      "address": "string"
    }
    ```

### Bookings

- **Get User Bookings**
  - **URL:** `/api/bookings`
  - **Method:** `GET`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer token"
    }
    ```
  - **Response:**
    ```json
    [
      {
        "_id": "string",
        "userId": "string",
        "name": "string",
        "email": "string",
        "movie": "string",
        "theater": "string",
        "date": "string",
        "time": "string",
        "seats": "number",
        "showtime": "string"
      }
    ]
    ```

- **Create Booking**
  - **URL:** `/api/bookings`
  - **Method:** `POST`
  - **Headers:**
    ```json
    {
      "Authorization": "Bearer token"
    }
    ```
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "movie": "string",
      "theater": "string",
      "date": "string",
      "time": "string",
      "seats": "number",
      "showtime": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Booking successful",
      "booking": {
        "_id": "string",
        "userId": "string",
        "name": "string",
        "email": "string",
        "movie": "string",
        "theater": "string",
        "date": "string",
        "time": "string",
        "seats": "number",
        "showtime": "string"
      }
    }
    ```

## Frontend Components

- **Auth:**
  - `Login.js` - User login
  - `Register.js` - User registration

- **Movies:**
  - `MovieList.js` - List of movies
  - `MovieDetails.js` - Movie details
  - `SearchMovies.js` - Search movies

- **Bookings:**
  - `BookingConfirmation.js` - Booking confirmation

- **Feedback:**
  - `FeedbackForm.js` - Feedback form

- **Theatre:**
  - `RegisterTheatre.js` - Theatre registration
  - `LoginTheatre.js` - Theatre login
  - `AddShow.js` - Add a new show
  - `UpdateShow.js` - Update show details
  - `BookingHistory.js` - View booking history
  - `ViewFeedback.js` - View feedback

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This README file now includes detailed descriptions of the API endpoints for registration, login, user data fetching and updating, and bookings. Adjust the details as necessary to fit your project's specifics.

