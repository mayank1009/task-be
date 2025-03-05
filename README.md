# Test-BE (Backend API)

This is a Node.js backend for user authentication and task management using Express, MongoDB, and JWT-based authentication.

## Features
- User Registration & Login
- Password Reset via Email
- Task CRUD Operations
- JWT Authentication Middleware
- MongoDB Database Connection

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   git clone https://github.com/your-repo/test-be.git
   cd test-be

2. Install dependencies:

   npm install

3. Create a `.env` file in the root directory and configure the following:

   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   CLIENT_URL=http://localhost:5173

4. Start the server:
   
   npm run dev   # For development (nodemon enabled)
   npm start     # For production

## API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/req-reset` - Request password reset
- `POST /auth/reset` - Reset password

### Task Routes (`/tasks`)
- `GET /tasks` - Get all tasks (Authenticated)
- `POST /tasks` - Create a task (Authenticated)
- `GET /tasks/:id` - Get a specific task (Authenticated)
- `PUT /tasks/:id` - Update a task (Authenticated)
- `DELETE /tasks/:id` - Delete a task (Authenticated)

## Middleware
- `authMiddleware.js` - Protects task routes using JWT authentication.