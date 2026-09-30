# Internship Application Tracker

A full-stack web application for students to track their internship applications.

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

### Security
- JWT authentication
- Role-based access control
- Password hashing
- Server-side validation
- Helmet security headers
- Rate limiting
- CORS protection
- Protected frontend routes
- Environment variables

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
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── .env.example
├── .gitignore
└── README.md