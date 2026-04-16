# Medical Software Backend

Express.js backend API for Medical Software application.

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Update .env file**
   Add your MongoDB URI and other environment variables:
   ```
   MONGODB_URI=mongodb+srv://nayan:Nayan04@cluster0.89f8n9b.mongodb.net/?appName=Cluster0
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/me` - Get current user profile
- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `PUT /api/user/profile` - Update user profile
- `DELETE /api/user/:id` - Delete user

### Health Check
- `GET /api/health` - Server status

## Project Structure

```
server/
├── models/          # Database models (User, etc.)
├── routes/          # API route handlers
├── middleware/      # Custom middleware (auth, etc.)
├── server.js        # Main server file
├── .env             # Environment variables
├── package.json     # Dependencies
└── README.md        # This file
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **express-validator** - Input validation

## Development Notes

- JWT tokens expire in 7 days
- Passwords are hashed using bcryptjs with 10 salt rounds
- CORS is enabled for all routes
- MongoDB connection is established on server startup
