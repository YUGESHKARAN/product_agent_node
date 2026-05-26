# Learning Guide: Building the Product Control Agent

Welcome to the **Product Control Agent** project! This guide will walk you through how this project was built, its architecture, and how you can contribute to its development.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Project Structure](#project-structure)
4. [Step-by-Step Build Process](#step-by-step-build-process)
5. [Core Components](#core-components)
6. [Development Workflow](#development-workflow)
7. [Common Tasks & Debugging](#common-tasks--debugging)
8. [Contributing Guidelines](#contributing-guidelines)

---

## Project Overview

**Product Control Agent** is an AI-powered full-stack application designed to automate CRUD operations and analyze product data. The project consists of three main components:

- **Frontend:** React.js with TailwindCSS for a modern, responsive UI
- **Backend:** Node.js/Express with MongoDB for data persistence and JWT for authentication
- **AI Service:** Flask backend with Llama 3 70B LLM for intelligent analysis (separate repository)

### Key Goals
- Simplify product management through AI automation
- Provide instant insights on product data
- Maintain secure authentication and authorization
- Enable seamless communication between frontend, backend, and AI services

---

## Architecture & Tech Stack

### Frontend Stack
```
React 19.1.0
├── Vite (Build Tool)
├── TailwindCSS (Styling)
├── React Router DOM 7.6.0 (Navigation)
├── Axios (HTTP Client)
├── React Icons (UI Icons)
└── js-cookie (Cookie Management)
```

**Why These Choices:**
- **Vite:** Lightning-fast development server and optimized builds
- **React 19:** Latest React features with improved performance
- **TailwindCSS:** Utility-first CSS for rapid UI development
- **Axios:** Promise-based HTTP client for API communication
- **React Router:** Client-side routing for multi-page navigation

### Backend Stack
```
Node.js + Express
├── MongoDB (NoSQL Database)
├── Mongoose (ODM for MongoDB)
├── JWT (Authentication)
├── bcryptjs (Password Hashing)
├── CORS (Cross-Origin Requests)
├── Multer (File Upload)
├── AWS S3 SDK (Cloud Storage)
├── Nodemailer (Email Service)
├── OTP Generator (Two-Factor Auth)
└── Serverless HTTP (Lambda Deployment)
```

**Why These Choices:**
- **Express:** Lightweight and flexible Node.js framework
- **MongoDB:** Flexible document-based database, scales well
- **JWT:** Stateless authentication without session storage
- **bcryptjs:** Secure password hashing with salt
- **AWS S3:** Scalable cloud storage for product images
- **Nodemailer:** Email notifications and OTP delivery

### AI Service
- **Flask:** Lightweight Python web framework
- **Llama 3 70B:** State-of-the-art LLM for analysis and CRUD automation
- **CUDA (Optional):** GPU acceleration for faster inference

---

## Project Structure

```
product_agent_node/
│
├── node-jwt-frontend/              # React Frontend Application
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API communication layer
│   │   ├── styles/                 # TailwindCSS configuration
│   │   ├── App.jsx                 # Main App component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env                        # Environment variables
│
├── nodejs-jwt-auth/                # Node.js/Express Backend
│   ├── models/                     # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Category.js
│   ├── routes/                     # API route handlers
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── categories.js
│   ├── controllers/                # Business logic
│   ├── middleware/                 # Custom middleware (auth, validation)
│   ├── utils/                      # Helper functions
│   ├── index.js                    # Server entry point
│   ├── package.json
│   └── .env                        # Environment variables
│
├── flask-ai/                       # Flask AI Backend (if included)
│   ├── app.py
│   ├── models/
│   ├── requirements.txt
│   └── .env
│
├── README.md                       # Project overview
├── LEARN.md                        # This file
└── LICENSE                         # MIT License

```

---

## Step-by-Step Build Process

### Phase 1: Project Setup & Initialization

#### Step 1.1: Create Project Structure
```bash
# Create main project directory
mkdir product_agent_node
cd product_agent_node

# Initialize Git
git init
git remote add origin https://github.com/YUGESHKARAN/product_agent_node.git
```

#### Step 1.2: Setup Frontend
```bash
# Create React app with Vite
npm create vite@latest node-jwt-frontend -- --template react

cd node-jwt-frontend

# Install dependencies
npm install

# Install additional packages
npm install axios js-cookie react-router-dom react-icons
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

**Key Configuration Files:**
- `vite.config.js` - Build and dev server configuration
- `tailwind.config.js` - Tailwind styling configuration
- `postcss.config.js` - CSS processing configuration

#### Step 1.3: Setup Backend
```bash
cd ../
mkdir nodejs-jwt-auth
cd nodejs-jwt-auth

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install express cors body-parser cookie-parser
npm install mongoose dotenv
npm install jsonwebtoken bcryptjs
npm install multer @aws-sdk/client-s3 nodemailer otp-generator
npm install serverless-http

# Install dev dependencies
npm install -D nodemon
```

#### Step 1.4: Setup Environment Files

**Backend `.env` (nodejs-jwt-auth/.env):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/product_agent
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=product-agent-bucket
AWS_REGION=us-east-1

# Email Service (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

**Frontend `.env` (node-jwt-frontend/.env):**
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Product Control Agent
```

---

### Phase 2: Backend Development

#### Step 2.1: Initialize Express Server
**File: `nodejs-jwt-auth/index.js`**

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Step 2.2: Create MongoDB Models

**File: `nodejs-jwt-auth/models/User.js`**

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

**File: `nodejs-jwt-auth/models/Product.js`**

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  imageUrl: String,
  stock: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
```

#### Step 2.3: Authentication Middleware

**File: `nodejs-jwt-auth/middleware/auth.js`**

```javascript
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { protect };
```

#### Step 2.4: Create API Routes

**File: `nodejs-jwt-auth/routes/auth.js`**

```javascript
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie('token', token);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie('token', token);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
```

---

### Phase 3: Frontend Development

#### Step 3.1: Create API Service Layer

**File: `node-jwt-frontend/src/services/api.js`**

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const authService = {
  register: (data) => API.post('/api/auth/register', data),
  login: (data) => API.post('/api/auth/login', data),
  logout: () => API.post('/api/auth/logout'),
};

export const productService = {
  getAll: () => API.get('/api/products'),
  getOne: (id) => API.get(`/api/products/${id}`),
  create: (data) => API.post('/api/products', data),
  update: (id, data) => API.put(`/api/products/${id}`, data),
  delete: (id) => API.delete(`/api/products/${id}`),
};

export default API;
```

#### Step 3.2: Create React Components

**File: `node-jwt-frontend/src/components/ProductCard.jsx`**

```javascript
import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-3">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold text-blue-600">${product.price}</span>
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(product)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

#### Step 3.3: Setup Routing

**File: `node-jwt-frontend/src/App.jsx`**

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/dashboard" 
          element={<PrivateRoute component={DashboardPage} />} 
        />
        <Route 
          path="/products" 
          element={<PrivateRoute component={ProductsPage} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
```

---

### Phase 4: Integration & Testing

#### Step 4.1: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd nodejs-jwt-auth
npm run dev
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd node-jwt-frontend
npm run dev
# Visit http://localhost:5173
```

#### Step 4.2: Test API Endpoints

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Core Components

### Frontend Components Hierarchy

```
App
├── PrivateRoute (Auth Guard)
├── Navbar
│   └── UserMenu
├── DashboardPage
│   ├── ProductList
│   │   └── ProductCard (Multiple)
│   └── ProductForm (Create/Edit)
└── LoginPage
    └── AuthForm
```

### Backend API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/products` | Get all products | Yes |
| POST | `/api/products` | Create product | Yes |
| PUT | `/api/products/:id` | Update product | Yes |
| DELETE | `/api/products/:id` | Delete product | Yes |

### Database Schema Relationships

```
User (1) ───── (Many) Product
  │id              userId
  ├─ name          ├─ name
  ├─ email         ├─ price
  └─ password      ├─ imageUrl
                   └─ category

Category (1) ───── (Many) Product
  │id              categoryId
  ├─ name          └─ name
  └─ description
```

---

## Development Workflow

### Local Development Setup

1. **Clone Repository:**
   ```bash
   git clone https://github.com/YUGESHKARAN/product_agent_node.git
   cd product_agent_node
   ```

2. **Install Dependencies:**
   ```bash
   # Frontend
   cd node-jwt-frontend && npm install && cd ..
   
   # Backend
   cd nodejs-jwt-auth && npm install && cd ..
   ```

3. **Configure Environment Variables:**
   - Copy `.env.example` to `.env` in both `node-jwt-frontend/` and `nodejs-jwt-auth/`
   - Fill in your MongoDB URI, JWT secret, and AWS credentials

4. **Run Development Servers:**
   ```bash
   # In separate terminals
   cd nodejs-jwt-auth && npm run dev
   cd node-jwt-frontend && npm run dev
   ```

5. **Access Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### Building for Production

**Frontend:**
```bash
cd node-jwt-frontend
npm run build
# Output: dist/
```

**Backend:**
```bash
cd nodejs-jwt-auth
npm start
# Or use serverless deployment (AWS Lambda)
```

---

## Common Tasks & Debugging

### Task 1: Add a New API Endpoint

1. **Create the route handler:**
   ```javascript
   // nodejs-jwt-auth/routes/newFeature.js
   const express = require('express');
   const { protect } = require('../middleware/auth');
   const router = express.Router();

   router.post('/', protect, async (req, res) => {
     // Implementation
   });

   module.exports = router;
   ```

2. **Add to main server:**
   ```javascript
   // index.js
   app.use('/api/newfeature', require('./routes/newFeature'));
   ```

3. **Create service in frontend:**
   ```javascript
   // node-jwt-frontend/src/services/api.js
   export const newFeatureService = {
     create: (data) => API.post('/api/newfeature', data),
   };
   ```

### Task 2: Debug CORS Issues

**Issue:** Frontend cannot reach backend

**Solution:**
1. Check CORS configuration in `index.js`
2. Ensure `CORS_ORIGIN` matches frontend URL
3. Verify `withCredentials: true` in API service

```javascript
// nodejs-jwt-auth/index.js
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

### Task 3: Fix MongoDB Connection Issues

**Issue:** Cannot connect to MongoDB

**Solution:**
1. Verify `MONGODB_URI` in `.env`
2. Check MongoDB connection string format
3. Ensure network access is enabled (MongoDB Atlas)
4. Test connection:
   ```bash
   mongosh "mongodb+srv://username:password@cluster.mongodb.net/product_agent"
   ```

### Task 4: Debug JWT Token Issues

**Issue:** "Not authorized" error

**Solution:**
1. Verify token is being sent in requests
2. Check token expiration in cookies/headers
3. Ensure `JWT_SECRET` matches on backend
4. Clear cookies and re-login

---

## Contributing Guidelines

### Before You Contribute

1. **Fork the Repository** to your GitHub account
2. **Clone Your Fork** locally
3. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### How to Contribute

#### 1. Bug Fixes
- Create an issue describing the bug
- Work on a branch named `fix/bug-description`
- Submit PR with detailed explanation

#### 2. New Features
- Discuss in an issue first
- Follow the existing code structure
- Write tests if applicable
- Update documentation

#### 3. Improvements
- Optimize code performance
- Refactor for readability
- Update dependencies
- Improve error handling

### Code Style Guidelines

**JavaScript/JSX:**
- Use ES6+ syntax
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await over .then()

```javascript
// Good
const fetchProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// Avoid
fetch('/api/products')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.log(e));
```

### Commit Messages

Follow conventional commits:
```
feat: Add product search functionality
fix: Resolve JWT token expiration issue
docs: Update README with setup instructions
refactor: Optimize database queries
test: Add unit tests for auth middleware
```

### Pull Request Process

1. **Update your branch with latest changes:**
   ```bash
   git fetch origin main
   git rebase origin/main
   ```

2. **Create PR with detailed description:**
   - What problem does it solve?
   - How does it solve it?
   - Testing performed
   - Screenshots (if UI changes)

3. **Address review comments** and update PR

4. **Merge when approved** (maintainers will merge)

### Testing Before PR

```bash
# Frontend
cd node-jwt-frontend
npm run lint
npm run build

# Backend
cd nodejs-jwt-auth
npm test
```

---

## Resources & References

### Documentation
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Learning Resources
- JWT Authentication: https://jwt.io/
- RESTful API Design: https://restfulapi.net/
- React Best Practices: https://react.dev/reference/react

### Tools & Services
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud Database
- [AWS S3](https://aws.amazon.com/s3/) - Cloud Storage
- [Postman](https://www.postman.com/) - API Testing
- [VS Code](https://code.visualstudio.com/) - Code Editor

---

## Getting Help

- **Questions?** Open a GitHub Discussion
- **Found a Bug?** Open an Issue with details
- **Want to Contribute?** Read this guide and submit a PR
- **Need Support?** Check existing issues and discussions

---

**Happy Coding! 🚀**

---

*Last Updated: May 2026*
*For the latest updates, visit: https://github.com/YUGESHKARAN/product_agent_node*
