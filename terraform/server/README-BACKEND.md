# Backend - MERN Kanban API

This is the backend API for the MERN Kanban board application, built with Node.js, Express.js, and MongoDB.

## 🚀 Features Implemented

### ✅ **Database Models**
- **User Model**: Enhanced with authentication, roles, and preferences
- **Board Model**: Comprehensive board management with members and settings
- **Column Model**: Flexible column structure with positioning and settings
- **Task Model**: Rich task management with priorities, tags, and assignments

### ✅ **Authentication & Authorization**
- JWT-based authentication system
- Role-based access control (admin, user)
- Board-level permissions (owner, admin, member, viewer)
- Secure password hashing with bcrypt

### ✅ **REST API Endpoints**

#### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /me` - Get current user profile

#### Users (`/api/users`)
- `GET /` - Get all users
- `POST /` - Create new user
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user

#### Boards (`/api/boards`)
- `POST /` - Create new board
- `GET /:boardId` - Get board by ID
- `PUT /:boardId` - Update board
- `DELETE /:boardId` - Delete board

#### Columns (`/api/columns`)
- `POST /` - Create new column
- `PUT /:columnId` - Update column
- `DELETE /:columnId` - Delete column

#### Tasks (`/api/tasks`)
- `POST /` - Create new task
- `PUT /:taskId` - Update task
- `DELETE /:taskId` - Delete task

### ✅ **Security Features**
- **Helmet**: Security headers
- **Rate Limiting**: API rate limiting
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Express-validator for request validation
- **Error Handling**: Comprehensive error handling middleware

### ✅ **Database Schema Design**

#### User Schema
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, min 6 chars, hashed),
  avatar: String,
  role: String (enum: 'user', 'admin'),
  isActive: Boolean,
  lastLogin: Date,
  preferences: {
    theme: String,
    notifications: Object
  }
}
```

#### Board Schema
```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  owner: ObjectId (ref: User),
  members: [{
    user: ObjectId (ref: User),
    role: String (enum: 'admin', 'member', 'viewer'),
    joinedAt: Date
  }],
  columns: [ObjectId (ref: Column)],
  settings: {
    isPublic: Boolean,
    allowComments: Boolean,
    theme: String
  }
}
```

#### Column Schema
```javascript
{
  title: String (required, max 50 chars),
  description: String (max 200 chars),
  board: ObjectId (ref: Board),
  position: Number,
  color: String (enum: colors),
  settings: {
    taskLimit: Number,
    isCollapsed: Boolean,
    autoAssignee: ObjectId (ref: User)
  }
}
```

#### Task Schema
```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  board: ObjectId (ref: Board),
  column: ObjectId (ref: Column),
  assignee: ObjectId (ref: User),
  creator: ObjectId (ref: User),
  dueDate: Date,
  priority: String (enum: 'low', 'medium', 'high'),
  tags: [String] (max 10),
  completionStatus: String (enum: statuses)
}
```

### ✅ **Advanced Features**

#### Middleware
- **Authentication Middleware**: JWT token verification
- **Authorization Middleware**: Role-based access control
- **Board Access Control**: Board-level permissions
- **Validation Middleware**: Request validation
- **Error Handling**: Centralized error handling

#### Database Optimizations
- **Indexes**: Optimized queries with proper indexing
- **Virtuals**: Computed fields for counts and relationships
- **Population**: Automatic population of references
- **Aggregation**: Support for complex queries

#### Security Measures
- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token generation and validation
- **Input Sanitization**: Protection against injection attacks
- **Rate Limiting**: Protection against brute force attacks

### 🛠️ **Technical Stack**

#### Core Dependencies
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Request validation

#### Security & Middleware
- **helmet**: Security headers
- **express-rate-limit**: Rate limiting
- **cors**: Cross-origin resource sharing
- **morgan**: HTTP request logging

### 📁 **Project Structure**

```
server/
├── models/
│   ├── User.js              # User model with authentication
│   ├── Board.js             # Board model with members
│   ├── Column.js            # Column model with positioning
│   └── Task.js              # Task model with rich features
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User CRUD operations
│   ├── boards.js            # Board management
│   ├── columns.js           # Column operations
│   └── tasks.js             # Task management
├── middleware/
│   └── auth.js              # Authentication & authorization
├── index.js                 # Main server file
├── seedData.js              # Database seeding script
├── .env                     # Environment variables
└── package.json             # Dependencies and scripts
```

### 🔧 **Environment Variables**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-app
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=http://localhost:5173
```

### 🚀 **Getting Started**

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.example` to `.env` and configure

3. **Start MongoDB**:
   Ensure MongoDB is running locally or configure cloud connection

4. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

### 📝 **API Usage Examples**

#### Register a new user
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Create a board
```bash
POST /api/boards
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "My Project Board",
  "description": "A board for managing my project tasks"
}
```

#### Create a task
```bash
POST /api/tasks
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Implement feature X",
  "description": "Add the new feature to the application",
  "boardId": "board_id_here",
  "columnId": "column_id_here",
  "priority": "high",
  "tags": ["feature", "backend"]
}
```

### 🗄️ **Database Seeding**

The included seeding script creates:
- 3 sample users with credentials
- 1 sample board with all users as members
- 3 columns (To Do, In Progress, Done)
- 5 sample tasks with various statuses

Test credentials:
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`
- Email: `bob@example.com`, Password: `password123`

### 🔮 **Future Enhancements**

1. **Real-time Updates**: WebSocket integration
2. **File Uploads**: Task attachments
3. **Email Notifications**: Task assignment notifications
4. **Advanced Analytics**: Board and task metrics
5. **Team Management**: Organization and team features
6. **API Versioning**: Support for multiple API versions

### 🐛 **Known Issues**

1. **Path-to-regexp compatibility**: There's a compatibility issue with the latest Express version and path-to-regexp
2. **Board middleware**: Some middleware chains need refinement
3. **Error handling**: Some edge cases need additional handling

### 📚 **Development Notes**

- All models include proper validation and error handling
- Database relationships are properly established with references
- Security follows best practices with proper authentication
- Code is well-documented and follows Node.js conventions
- API follows RESTful principles

This backend provides a solid foundation for a production-ready Kanban board application with comprehensive features and security measures.
