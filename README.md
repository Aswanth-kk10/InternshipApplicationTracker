# Internship Application Tracker

A full-stack web application that allows students to manage and track their internship applications in one place.

## Live Application

**Frontend:**  
https://internship-application-tracker-nu.vercel.app

**Backend API:**  
https://internshipapplicationtracker.onrender.com

## Technologies Used

### Frontend

- React.js
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Features

- Student registration
- Student login
- JWT authentication
- Protected routes
- Add internship applications
- View internship applications
- Edit applications
- Delete applications
- Filter applications by status
- Pagination
- Password reset
- Role-based access control
- REST API
- Logout

## Application Status

Applications can have the following statuses:

- Applied
- Shortlisted
- Interview
- Selected
- Rejected

## Security

The application implements:

- JWT-based authentication
- Password hashing using bcryptjs
- Role-based access control
- Server-side input validation
- Helmet security headers
- Rate limiting
- CORS configuration
- Protected frontend routes
- Environment variables for sensitive configuration

## Project Structure

```text
InternshipApplicationTracker
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── .env.example
├── .gitignore
└── README.md