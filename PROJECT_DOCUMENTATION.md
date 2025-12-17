# PROJECT DOCUMENTATION
## Food Delivery Platform (Blog Application)

**Author:** Dr. Sanju Gupta  
**Version:** 1.0  
**Last Updated:** October 31, 2025

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Features](#features)
6. [Installation & Setup](#installation--setup)
7. [Project Structure](#project-structure)
8. [API Documentation](#api-documentation)
9. [Database Schema](#database-schema)
10. [Frontend Components](#frontend-components)
11. [Backend Controllers](#backend-controllers)
12. [Authentication & Security](#authentication--security)
13. [Payment Integration](#payment-integration)
14. [Admin Panel](#admin-panel)
15. [Usage Guide](#usage-guide)
16. [Performance Optimization](#performance-optimization)
17. [Troubleshooting](#troubleshooting)
18. [Conclusion](#conclusion)

---

## Executive Summary

This document provides comprehensive documentation for the Food Delivery Platform, a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application. The platform enables users to browse, order, and track food deliveries through an intuitive interface, while administrators manage inventory and orders through a dedicated admin panel. The application integrates secure payment processing via Stripe and implements modern web development best practices.

### Document Purpose
This document serves as a complete technical reference for developers, administrators, and stakeholders involved in the Food Delivery Platform project. It covers system design, implementation details, deployment procedures, and maintenance guidelines.

---

## Project Overview

The Food Delivery Platform is a comprehensive e-commerce solution specifically designed for food ordering and delivery services. Built with modern technologies, the platform provides a seamless user experience for customers while offering powerful management tools for administrators.

### Project Goals
- Provide an intuitive and responsive food ordering interface for customers
- Enable efficient food inventory and order management for administrators
- Implement secure, reliable payment processing
- Ensure high performance and scalability
- Maintain data security and user privacy
- Deliver a mobile-friendly user experience

### Key Features Overview
- Real-time order tracking
- Secure user authentication
- Multiple payment gateway integration (Stripe)
- Admin dashboard for complete control
- Responsive design for all devices
- Speech recognition for voice-based ordering
- Order history and detailed tracking

---

## System Architecture

### Overall Architecture

The Food Delivery Platform follows a three-tier client-server architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                        │
│  ┌──────────────────┐         ┌──────────────────────────┐  │
│  │  Customer Portal │         │    Admin Dashboard       │  │
│  │  (React.js)      │         │    (React.js)            │  │
│  └──────────────────┘         └──────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP/REST APIs
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                         │
│              Express.js Server (Node.js)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • Food Management    • Cart Management              │   │
│  │  • User Authentication • Order Processing             │   │
│  │  • Payment Handling   • Admin Operations              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓ Database Queries
┌─────────────────────────────────────────────────────────────┐
│                    DATA TIER                                │
│                  MongoDB Database                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Users │ Foods │ Carts │ Orders │ Transactions       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Architecture Layers Explanation

#### 1. Presentation Layer (Frontend)
- **Customer Portal:** React-based interface for end users to browse, order, and track food
- **Admin Dashboard:** Separate React application for administrative functions
- Responsive design ensuring compatibility across devices
- State management using React Context API
- Interaction with backend via RESTful API calls

#### 2. Application Layer (Backend)
- **Express.js Server:** Handles all business logic and API requests
- **Controllers:** Process requests and coordinate business operations
- **Middleware:** Handle authentication, validation, and error handling
- **Routes:** Map HTTP endpoints to controller functions
- **Services:** Implement core business logic

#### 3. Data Layer (Database)
- **MongoDB:** NoSQL database for flexible data storage
- **Mongoose:** Object Data Modeling for schema validation
- Collections for users, food items, orders, and transactions
- Support for complex queries and data relationships

---

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.0.0 | UI framework for building user interfaces |
| Vite | 6.1.0 | Modern build tool and dev server |
| React Router | 7.1.5 | Client-side routing and navigation |
| Axios | 1.7.9 | HTTP client for API communication |
| React Toastify | 11.0.3 | Toast notifications for user feedback |
| CSS3 | - | Styling and responsive design |
| JavaScript (ES6+) | - | Programming language |

### Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | Latest | JavaScript runtime environment |
| Express.js | 4.21.2 | Web application framework |
| MongoDB | 8.10.1 | NoSQL database |
| Mongoose | Latest | MongoDB object modeling |
| JWT | 9.0.2 | Token-based authentication |
| Bcrypt | 5.1.1 | Password hashing and security |
| Multer | 1.4.5 | Middleware for file uploads |
| Stripe | 17.6.0 | Payment processing |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| Dotenv | 16.4.7 | Environment variable management |
| Nodemon | 3.1.9 | Development server with auto-reload |

### Development & Deployment Tools
- ESLint: Code quality and linting
- Git: Version control
- npm/yarn: Package management

---

## Features

### Customer Features

#### 1. User Authentication
- User registration with email verification
- Secure login with password hashing
- JWT-based session management
- Password reset functionality
- User profile management

#### 2. Food Browsing & Discovery
- Browse food items by categories
- Search functionality with filters
- Sort options (price, rating, popularity)
- Detailed food item descriptions
- High-quality food images

#### 3. Shopping Cart
- Add/remove items from cart
- Update item quantities
- Real-time price calculation
- Cart persistence
- Coupon/promo code support

#### 4. Order Placement
- Easy checkout process
- Multiple delivery address support
- Delivery time estimation
- Order summary review
- Confirmation notifications

#### 5. Payment Processing
- Secure Stripe payment integration
- Multiple payment methods support
- Real-time transaction processing
- Payment verification and confirmation
- Invoice generation

#### 6. Order Tracking
- Real-time order status updates
- Estimated delivery time
- Delivery agent location tracking
- Order history
- Detailed order receipts

#### 7. Advanced Features
- Voice-based ordering (Speech Model)
- Mobile-responsive design
- Favorites/wishlist functionality
- Order notifications
- Rating and review system

### Admin Features

#### 1. User Management
- View all registered users
- User account control
- User role assignment
- Account suspension/activation
- User analytics

#### 2. Food Inventory Management
- Add new food items
- Edit food details (name, description, price, category)
- Delete food items
- Upload food images
- Manage food categories
- Track inventory levels

#### 3. Order Management
- View all orders
- Update order status (pending → confirmed → cooking → delivered)
- Assign delivery agents
- Track order timeline
- Generate order reports
- Cancel/refund orders

#### 4. Analytics & Reporting
- Sales reports
- Revenue analytics
- Popular items tracking
- User activity monitoring
- Payment analytics

#### 5. System Configuration
- App settings management
- Delivery zone configuration
- Pricing and tax settings
- Commission settings

---

## Installation & Setup

### Prerequisites

#### System Requirements
- Operating System: Windows, macOS, or Linux
- RAM: Minimum 4GB (8GB recommended)
- Disk Space: 2GB free space

#### Software Requirements
- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher (or yarn v1.22.0+)
- **MongoDB:** v4.4 or higher (local installation or MongoDB Atlas account)
- **Git:** v2.0 or higher
- **Code Editor:** VS Code (recommended)

#### External Services
- **Stripe Account:** For payment processing
- **Email Service:** SMTP credentials (optional)

### Backend Setup Guide

#### Step 1: Clone and Navigate
```bash
cd blog/backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment File
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mern
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_this
JWT_EXPIRE=7d

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads

# Application URL
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

#### Step 4: Verify MongoDB Connection
Ensure MongoDB is running:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas connection string
```

#### Step 5: Start Backend Server
```bash
npm start
```

Expected output:
```
DB Connected
Server is running http://localhost:5000
```

### Frontend Setup Guide

#### Step 1: Navigate to Frontend Directory
```bash
cd blog/frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment File
Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_publishable_key
VITE_APP_NAME=FoodDeliver
```

#### Step 4: Start Development Server
```bash
npm run dev
```

Access the application at: `http://localhost:5173`

### Admin Panel Setup Guide

#### Step 1: Navigate to Admin Directory
```bash
cd blog/admin
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment File
Create a `.env` file in the admin directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Step 4: Start Admin Server
```bash
npm run dev
```

Access the admin panel at: `http://localhost:5174` (or next available port)

### Complete Development Environment Setup

Run all three services with this workflow:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Admin:**
```bash
cd admin
npm run dev
```

### Production Build

#### Frontend Build
```bash
cd frontend
npm run build
# Creates dist/ folder for deployment
```

#### Admin Build
```bash
cd admin
npm run build
# Creates dist/ folder for deployment
```

#### Backend for Production
```bash
# In package.json, update start script to remove nodemon
# Then run:
node index.js
```

---

## Project Structure

### Complete Folder Structure

```
blog/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controllers/
│   │   ├── FoodController.js        # Handle food-related operations
│   │   ├── UserController.js        # User registration, login, management
│   │   ├── CartController.js        # Shopping cart operations
│   │   └── OrderContoller.js        # Order creation and tracking
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── models/
│   │   ├── FoodModel.js             # Food item schema
│   │   ├── UserModel.js             # User account schema
│   │   └── OrderModel.js            # Order and transaction schema
│   ├── routes/
│   │   ├── FoodRoute.js             # Food endpoints (/api/food)
│   │   ├── UserRoute.js             # User endpoints (/api/user)
│   │   ├── CartRoute.js             # Cart endpoints (/api/cart)
│   │   └── OrderRoute.js            # Order endpoints (/api/order)
│   ├── uploads/                     # Stored food images
│   ├── index.js                     # Main server file
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Example env file
│   └── package.json                 # Dependencies
│
├── frontend/
│   ├── public/
│   │   └── assets/                  # Static images and icons
│   ├── src/
│   │   ├── asset/
│   │   │   └── assets.js            # Asset URLs and constants
│   │   ├── components/
│   │   │   ├── AppDownload/         # App download promotional section
│   │   │   ├── Exploremenu/         # Food category menu
│   │   │   ├── FoodDisplay/         # Food items grid/list
│   │   │   ├── FoodItem/            # Individual food card component
│   │   │   ├── Footer/              # Footer component
│   │   │   ├── Header/              # Hero/banner section
│   │   │   ├── LoginPopUp/          # Login/registration modal
│   │   │   ├── Navbar/              # Navigation bar
│   │   │   └── SpeechModel/         # Voice command component
│   │   ├── context/
│   │   │   └── StoreContext.jsx     # Global state management
│   │   ├── pages/
│   │   │   ├── Cart/                # Shopping cart page
│   │   │   ├── Home/                # Homepage with menu
│   │   │   ├── MyOrders/            # Order history page
│   │   │   ├── OrderDetails/        # Order tracking details
│   │   │   ├── PlaceOrder/          # Checkout page
│   │   │   └── verify/              # Payment verification page
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React DOM entry point
│   │   ├── ScrollToTop.jsx          # Scroll behavior component
│   │   ├── App.css                  # Global styles
│   │   └── index.css                # Base styles
│   ├── index.html                   # HTML template
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Example env file
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite build configuration
│   └── eslint.config.js             # Code linting rules
│
├── admin/
│   ├── public/
│   │   └── assets/                  # Admin assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/              # Admin navigation bar
│   │   │   └── Sidebar/             # Admin sidebar menu
│   │   ├── pages/
│   │   │   ├── Add/                 # Add new food page
│   │   │   ├── List/                # Food inventory list
│   │   │   └── Orders/              # Order management page
│   │   ├── App.jsx                  # Admin app component
│   │   └── main.jsx                 # Entry point
│   ├── index.html                   # HTML template
│   ├── .env                         # Environment variables
│   ├── package.json                 # Dependencies
│   ├── vite.config.js               # Vite configuration
│   └── eslint.config.js             # Linting rules
│
├── PROJECT_DOCUMENTATION.md         # This file
└── README.md                        # Quick start guide
```

---

## API Documentation

### Base URL and Authentication

**Development Base URL:** `http://localhost:5000/api`

**Authentication:** Most protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Food Management APIs

#### Get All Foods
```
GET /food/list
Method: GET
Auth Required: No
Response: {
  success: true,
  data: [
    {
      _id: "...",
      name: "Biryani",
      description: "Hyderabadi biryani",
      price: 250,
      image: "url",
      category: "Biryani"
    },
    ...
  ]
}
```

#### Add Food (Admin)
```
POST /food/add
Method: POST
Auth Required: Yes (Admin)
Headers: Authorization: Bearer <token>
Body: {
  name: "Biryani",
  description: "Description",
  price: 250,
  image: <file>,
  category: "Biryani"
}
Response: {
  success: true,
  message: "Food item added successfully"
}
```

#### Remove Food (Admin)
```
POST /food/remove
Method: POST
Auth Required: Yes (Admin)
Body: {
  id: "food_id"
}
Response: {
  success: true,
  message: "Food item removed"
}
```

### User Authentication APIs

#### Register User
```
POST /user/register
Method: POST
Auth Required: No
Body: {
  name: "John Doe",
  email: "john@example.com",
  password: "securePassword123"
}
Response: {
  success: true,
  token: "jwt_token",
  user: { id, name, email }
}
```

#### Login User
```
POST /user/login
Method: POST
Auth Required: No
Body: {
  email: "john@example.com",
  password: "securePassword123"
}
Response: {
  success: true,
  token: "jwt_token",
  user: { id, name, email }
}
```

### Cart Management APIs

#### Add to Cart
```
POST /cart/add
Method: POST
Auth Required: Yes
Body: {
  userId: "user_id",
  foodId: "food_id",
  quantity: 2
}
Response: {
  success: true,
  message: "Added to cart"
}
```

#### Get Cart
```
GET /cart/get
Method: GET
Auth Required: Yes
Response: {
  success: true,
  data: [
    {
      foodId: "...",
      name: "Biryani",
      quantity: 2,
      price: 250
    },
    ...
  ]
}
```

#### Remove from Cart
```
POST /cart/remove
Method: POST
Auth Required: Yes
Body: {
  userId: "user_id",
  foodId: "food_id"
}
Response: {
  success: true,
  message: "Removed from cart"
}
```

### Order Management APIs

#### Place Order
```
POST /order/place
Method: POST
Auth Required: Yes
Body: {
  userId: "user_id",
  items: [
    { foodId: "...", quantity: 2, price: 250 }
  ],
  amount: 500,
  address: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    country: "USA",
    phone: "+1234567890"
  }
}
Response: {
  success: true,
  session_url: "stripe_session_url"
}
```

#### Get User Orders
```
GET /order/userorders
Method: GET
Auth Required: Yes
Response: {
  success: true,
  data: [
    {
      _id: "...",
      userId: "...",
      items: [...],
      amount: 500,
      status: "pending",
      date: "2025-12-07"
    },
    ...
  ]
}
```

#### Verify Payment
```
POST /order/verify
Method: POST
Auth Required: No
Body: {
  success: true/false,
  orderId: "order_id"
}
Response: {
  success: true,
  message: "Payment verified"
}
```

#### Get All Orders (Admin)
```
GET /order/list
Method: GET
Auth Required: Yes (Admin)
Response: {
  success: true,
  data: [
    {
      _id: "...",
      userId: "...",
      items: [...],
      status: "pending",
      amount: 500
    },
    ...
  ]
}
```

#### Update Order Status (Admin)
```
POST /order/status
Method: POST
Auth Required: Yes (Admin)
Body: {
  orderId: "order_id",
  status: "confirmed" // or "cooking", "delivered"
}
Response: {
  success: true,
  message: "Status updated"
}
```

---

## Database Schema

### Food Collection

**Purpose:** Store food items available for ordering

```javascript
{
  _id: ObjectId,
  name: String,              // e.g., "Chicken Biryani"
  description: String,       // Item description
  price: Number,             // Price in rupees
  image: String,             // Image URL or filename
  category: String,          // e.g., "Biryani", "Curry", etc.
  available: Boolean,        // Availability status
  rating: Number,            // Average rating (0-5)
  reviews: Number,           // Number of reviews
  preparationTime: Number,   // Time in minutes
  isVeg: Boolean,            // Vegetarian flag
  createdAt: Timestamp,      // Creation date
  updatedAt: Timestamp       // Last update
}
```

### User Collection

**Purpose:** Store user account information

```javascript
{
  _id: ObjectId,
  name: String,              // User's full name
  email: String,             // Unique email (indexed)
  password: String,          // Bcrypt hashed password
  phone: String,             // Contact number
  role: String,              // "user" or "admin"
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    label: String,           // "home", "office", etc.
    isDefault: Boolean
  }],
  profileImage: String,      // URL to profile picture
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLogin: Timestamp,
  isActive: Boolean
}
```

### Cart Collection

**Purpose:** Temporary storage for user shopping carts

```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to User
  items: [{
    foodId: ObjectId,        // Reference to Food
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    category: String
  }],
  totalItems: Number,
  totalPrice: Number,
  lastUpdated: Timestamp
}
```

### Order Collection

**Purpose:** Store order information and transaction records

```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to User
  items: [{
    foodId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalAmount: Number,
  discount: Number,
  taxes: Number,
  deliveryCharges: Number,
  deliveryAddress: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String
  },
  status: String,            // "pending", "confirmed", "cooking", "out_for_delivery", "delivered", "cancelled"
  orderDate: Timestamp,
  estimatedDeliveryTime: Timestamp,
  deliveryTime: Timestamp,
  paymentMethod: String,     // "stripe", "upi", "wallet", etc.
  paymentStatus: String,     // "pending", "completed", "failed", "refunded"
  transactionId: String,     // Stripe transaction ID
  notes: String,             // Special delivery instructions
  ratings: {
    foodRating: Number,
    deliveryRating: Number,
    comments: String
  }
}
```

---

## Frontend Components

### Layout Components

#### Navbar
**Purpose:** Main navigation component visible on all pages
- Displays application logo and branding
- Navigation links (Home, Orders, etc.)
- Shopping cart icon with item count badge
- User authentication status
- Login/Logout button
- Mobile hamburger menu
- Search bar for food items

#### Footer
**Purpose:** Footer section with company information
- Company description and mission
- Quick links (About, Help, Contact)
- Social media links
- Newsletter subscription
- Contact information
- Legal links (Terms, Privacy)
- Payment method icons

### Page Components

#### Home Page
**Purpose:** Landing page and main browsing interface
- Hero banner with promotional content
- Food category explorer/menu
- Featured food items showcase
- Food items grid with search/filter
- App download section
- Testimonials
- Call-to-action for ordering

#### Cart Page
**Purpose:** Shopping cart management
- List of items in cart with details
- Item quantity adjustment controls
- Individual item price display
- Cart total calculation
- Remove item functionality
- Proceed to checkout button
- Empty cart message
- Recommended items suggestion

#### PlaceOrder Page (Checkout)
**Purpose:** Order placement and payment
- Delivery address form
- Address selection from saved addresses
- Order summary and itemization
- Bill breakdown (subtotal, tax, delivery)
- Coupon/promo code input
- Payment method selection
- Stripe payment form integration
- Order confirmation

#### MyOrders Page
**Purpose:** Order history and tracking
- List of all user orders
- Order status badges
- Order date and total amount
- Delivery status indicators
- Quick view order details
- Reorder functionality
- Order filters (Active, Completed, Cancelled)

#### OrderDetails Page
**Purpose:** Detailed order tracking
- Full order information
- Item details with quantities
- Delivery address
- Order timeline visualization
- Current delivery status
- Estimated delivery time
- Delivery partner information
- Rate and review option
- Cancel/return option

### Functional Components

#### FoodItem
**Purpose:** Individual food card component
- Food image
- Food name and category
- Description
- Price display
- Rating and review count
- Add to cart button
- Quantity selector
- Availability status
- Special badges (veg/non-veg, bestseller)

#### LoginPopUp
**Purpose:** Authentication modal
- Email input field
- Password input field
- Remember me checkbox
- Sign up/Login toggle
- Google/Social login buttons
- Password forget link
- Error message display
- Loading state

#### SpeechModel
**Purpose:** Voice command recognition
- Microphone icon/button
- Voice input processing
- Text-to-speech feedback
- Command recognition results
- Voice control for ordering

---

## Backend Controllers

### FoodController
**File:** `controllers/FoodController.js`

#### Methods:
1. **addFood()** - Add new food items (Admin)
2. **removeFood()** - Delete food items (Admin)
3. **listFood()** - Retrieve all food items
4. **foodDetails()** - Get specific food item
5. **updateFood()** - Edit food details (Admin)

### UserController
**File:** `controllers/UserController.js`

#### Methods:
1. **register()** - User registration
2. **login()** - User login with JWT generation
3. **getUserProfile()** - Fetch user details
4. **updateProfile()** - Update user information
5. **changePassword()** - Password change
6. **logout()** - Session termination

### CartController
**File:** `controllers/CartController.js`

#### Methods:
1. **addToCart()** - Add item to shopping cart
2. **removeFromCart()** - Remove item from cart
3. **getCart()** - Fetch cart contents
4. **updateCartItem()** - Modify item quantity
5. **clearCart()** - Empty the cart

### OrderController
**File:** `controllers/OrderContoller.js`

#### Methods:
1. **placeOrder()** - Create new order
2. **userOrders()** - Retrieve user's orders
3. **listOrders()** - Get all orders (Admin)
4. **updateOrderStatus()** - Change order status (Admin)
5. **verifyPayment()** - Verify Stripe payment
6. **cancelOrder()** - Order cancellation

---

## Authentication & Security

### JWT (JSON Web Tokens)

#### Token Structure:
- **Header:** Algorithm (HS256) and token type
- **Payload:** User ID, role, email, expiration
- **Signature:** Encrypted with SECRET_KEY

#### Token Lifecycle:
1. Generated on successful login/registration
2. Stored in browser localStorage (Frontend)
3. Sent with each protected request in Authorization header
4. Validated by middleware before processing
5. Expires after configured duration (default: 7 days)

### Password Security

#### Hashing Process:
1. User enters password during registration
2. Password validated for strength (min 8 characters, mixed case, numbers)
3. Bcrypt algorithm applies salt (10 rounds)
4. Hashed password stored in MongoDB
5. Plain password never stored

#### Login Verification:
1. User enters email and password
2. User record fetched from database
3. Bcrypt compares input password with stored hash
4. JWT token generated if match successful
5. Token returned to client

### Protected Routes

#### Admin Routes:
- `/api/food/add` - Requires admin role
- `/api/food/remove` - Requires admin role
- `/api/order/list` - Requires admin role
- `/api/order/status` - Requires admin role

#### User Routes:
- `/api/cart/add` - Requires valid user token
- `/api/order/place` - Requires valid user token
- `/api/order/userorders` - Requires valid user token

### Middleware Security

#### auth.js Middleware:
```javascript
- Extracts token from Authorization header
- Validates JWT signature
- Checks token expiration
- Verifies user existence
- Attaches user data to request
- Rejects if token invalid/expired
```

### CORS Configuration

- **Allowed Origins:** Frontend URL (http://localhost:5173), Admin URL
- **Allowed Methods:** GET, POST, PUT, DELETE
- **Allowed Headers:** Content-Type, Authorization
- **Credentials:** Enabled for cookie/token transmission

### Data Validation

- Email format validation with regex
- Password strength requirements
- Input sanitization to prevent injection
- File upload validation (size, type)
- Request body schema validation using validators

---

## Payment Integration

### Stripe Setup and Implementation

#### Frontend Integration:
1. Stripe Public Key stored in environment variables
2. Stripe JavaScript library loaded
3. Payment form rendered on checkout page
4. Card details captured securely
5. Stripe token generated for payment

#### Backend Payment Processing:
1. Receive Stripe token from frontend
2. Validate order amount and items
3. Create Stripe payment intent
4. Process transaction through Stripe API
5. Receive payment confirmation/rejection
6. Update order status based on payment result

#### Payment Flow:
```
User Enters Card Details
        ↓
Stripe Tokenizes Data
        ↓
Token Sent to Backend
        ↓
Backend Creates Payment Intent
        ↓
Stripe Processes Payment
        ↓
Confirmation Sent to Backend
        ↓
Order Status Updated
        ↓
User Receives Confirmation
```

### Error Handling:
- Invalid card numbers
- Expired cards
- Insufficient funds
- 3D Secure verification failures
- Network timeout handling
- Duplicate transaction prevention

### Refund Processing:
- Full refund for cancelled orders
- Partial refund for returned items
- Automatic refund initiation
- Refund status tracking
- Customer notification

---

## Admin Panel

### Features and Functionality

#### Dashboard Overview
- Quick statistics (Orders, Revenue, Users)
- Recent orders list
- Popular items
- Daily sales chart
- Order status breakdown

#### Food Management
- Add new food items with image upload
- Edit existing food details
- Delete food items
- View food inventory
- Category management
- Bulk actions
- Search and filter
- Export food list

#### Order Management
- View all orders with filtering
- Update order status
- Assign delivery partners
- Add delivery notes
- Generate order invoice
- Cancel/refund orders
- View order timeline
- Customer communication

#### User Management
- View registered users list
- User account details
- Role assignment
- Account activation/deactivation
- User activity logs
- Contact user

#### Analytics & Reports
- Sales reports (daily, weekly, monthly)
- Revenue analytics
- Popular items report
- User growth chart
- Payment method analysis
- Delivery performance metrics

#### System Settings
- App configuration
- Delivery zones setup
- Pricing and taxes
- Commission settings
- Email templates
- SMS gateway configuration

### Navigation Structure
- Sidebar with main menu
- Top navigation bar
- Breadcrumb navigation
- Quick access shortcuts
- User profile dropdown
- Logout option

---

## Usage Guide

### For Customers

#### 1. Getting Started
1. Visit http://localhost:5173
2. Browse food items by category
3. Create an account or login
4. Add items to cart

#### 2. Ordering Process
1. Add desired items to cart
2. Click "Proceed to Checkout"
3. Enter/select delivery address
4. Review order summary
5. Enter card details
6. Confirm payment
7. Receive order confirmation

#### 3. Tracking Orders
1. Navigate to "My Orders"
2. View all past and current orders
3. Click on order to see details
4. Track real-time delivery status
5. Estimated delivery time displayed

#### 4. Managing Account
1. Click user profile icon
2. View personal information
3. Update profile details
4. Change password
5. Manage delivery addresses
6. View order history

### For Administrators

#### 1. Food Item Management
1. Login to admin panel
2. Go to "Add Food" section
3. Fill in food details
4. Upload food image
5. Set price and category
6. Click "Add" button

#### 2. Managing Orders
1. Go to "Orders" section
2. View all pending orders
3. Click order to view details
4. Update status (Confirmed → Cooking → Out for Delivery → Delivered)
5. Add notes if needed
6. Process refunds if necessary

#### 3. Inventory Management
1. Go to "List" section
2. View all food items
3. Edit or delete as needed
4. Manage item availability
5. Track inventory levels

---

## Performance Optimization

### Frontend Optimization
- **Code Splitting:** React Router enables component-level code splitting
- **Lazy Loading:** Images loaded on demand using Intersection Observer
- **Caching:** Browser caching for static assets
- **Minification:** CSS and JavaScript minified in production
- **Image Optimization:** Compressed images with appropriate formats
- **State Management:** Context API prevents unnecessary re-renders
- **Virtual Scrolling:** Long lists rendered efficiently

### Backend Optimization
- **Database Indexing:** Indexed fields for fast queries (userId, email, category)
- **Query Optimization:** Lean queries for read-only operations
- **Pagination:** Large result sets paginated
- **Caching:** Frequently accessed data cached
- **Connection Pooling:** Mongoose connection pool management
- **Compression:** Gzip compression for API responses
- **Load Balancing:** Ready for horizontal scaling

### Database Optimization
- **Indexes:** Created on frequently queried fields
- **Connection Pooling:** Optimized connection management
- **Query Optimization:** Efficient aggregation pipelines
- **Data Archiving:** Old orders moved to archive collection
- **Regular Maintenance:** Defragmentation and cleanup

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
**Problem:** "DB Connection Failed"
**Solution:**
- Ensure MongoDB is running locally or check connection string
- For MongoDB Atlas: verify IP whitelist and credentials
- Check `.env` file for correct `MONGODB_URI`

#### 2. CORS Error
**Problem:** "Access to XMLHttpRequest blocked by CORS policy"
**Solution:**
- Ensure backend CORS is enabled
- Check frontend URL is in CORS whitelist
- Restart backend server

#### 3. JWT Token Error
**Problem:** "Token expired" or "Invalid token"
**Solution:**
- Clear browser cache and localStorage
- Login again to get new token
- Check JWT_SECRET in `.env` file

#### 4. Image Upload Fails
**Problem:** Images not uploading or not displaying
**Solution:**
- Check `uploads/` directory exists and has write permissions
- Verify multer configuration
- Check file size limits

#### 5. Payment Error
**Problem:** Stripe payment fails
**Solution:**
- Verify Stripe keys in `.env`
- Check Stripe account is in live/test mode correctly
- Use Stripe test card: 4242 4242 4242 4242

#### 6. Frontend Won't Start
**Problem:** Vite dev server won't start
**Solution:**
```bash
npm run dev
# If still fails:
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 7. Backend Port Already in Use
**Problem:** "Port 5000 is already in use"
**Solution:**
```bash
# Kill process on port 5000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change port in index.js
app.listen(5001, () => {...})
```

---

## Development Workflow

### Running the Full Stack

1. **Terminal 1 - Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Terminal 2 - Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Terminal 3 - Admin Panel** (optional)
   ```bash
   cd admin
   npm run dev
   ```

4. **Browser Access**
   - Frontend: http://localhost:5173
   - Admin: http://localhost:5174 (or next available port)
   - Backend API: http://localhost:5000/api

### Build for Production

**Frontend**
```bash
cd frontend
npm run build
# Output: dist/ folder
```

**Admin**
```bash
cd admin
npm run build
# Output: dist/ folder
```

**Backend**
- No build step required
- Run with: `node index.js` (without nodemon)

---

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
```

### Admin (.env)
```env
VITE_API_URL=http://localhost:5000
```

---

## Performance Optimization

### Frontend
- Image optimization with lazy loading
- Code splitting with React Router
- CSS minification in production build
- Caching strategy for static assets

### Backend
- Database indexing on frequently queried fields
- Request validation middleware
- Error handling and logging
- Rate limiting for API endpoints

### Database
- Mongoose lean queries for read-only operations
- Proper indexing on user ID and timestamps
- Connection pooling

---

## Deployment Considerations

### Frontend Deployment
- Build static assets: `npm run build`
- Deploy `dist/` folder to hosting (Vercel, Netlify, etc.)
- Update environment variables

### Backend Deployment
- Use production-grade database (MongoDB Atlas)
- Use environment variables for secrets
- Enable HTTPS
- Set up proper logging
- Configure CORS for production domain

### Database
- Use MongoDB Atlas for managed hosting
- Enable backups
- Monitor performance
- Set up alerts

### Common Setup Issues

#### MongoDB Connection Failed
**Symptom:** Backend starts but cannot connect to database
**Solutions:**
- Verify MongoDB is running: `mongod`
- Check MongoDB URI in `.env` file
- Default URI: `mongodb://localhost:27017/mern`
- Ensure port 27017 is open and not in use
- Check database name matches in URI

#### Port Already in Use
**Symptom:** Error "EADDRINUSE: address already in use :::5000"
**Solutions:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

#### CORS Errors in Browser
**Symptom:** Cross-Origin Request Blocked error
**Solutions:**
- Verify backend CORS configuration includes frontend URL
- Check frontend API URL matches backend domain
- Ensure credentials are properly sent with requests
- Frontend should use: `http://localhost:5000`

#### Module Not Found Errors
**Symptom:** "Cannot find module 'express'" or similar
**Solutions:**
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

#### JWT Token Errors
**Symptom:** "Invalid token" or "Token expired"
**Solutions:**
- Clear localStorage: `localStorage.clear()`
- Verify JWT_SECRET in `.env` file
- Check token expiration time
- Re-login to generate new token

### Runtime Errors

#### Stripe Payment Failed
**Symptom:** Payment processing error at checkout
**Solutions:**
- Verify Stripe keys in `.env` files
- Use test card: 4242 4242 4242 4242
- Check internet connection
- Verify Stripe account is active
- Check card details for typos

#### Image Upload Not Working
**Symptom:** Food image doesn't upload or display
**Solutions:**
- Verify multer configuration in backend
- Check upload folder exists: `backend/uploads/`
- Verify file size limit (default 5MB)
- Check file format (jpg, png, jpeg)
- Ensure proper permissions on upload folder

#### Login Not Working
**Symptom:** Login fails or infinite loading
**Solutions:**
- Verify user exists in database
- Check password is correct
- Verify backend is running
- Check network tab in browser console
- Clear browser cache

### Development Environment Issues

#### npm start Not Working
**Symptom:** Backend doesn't start
**Solutions:**
```powershell
# Check Node.js version
node --version  # Should be >= 14.0

# Check npm version
npm --version   # Should be >= 6.0

# Delete node_modules and reinstall
Remove-Item -Recurse node_modules
npm install

# Try running with explicit node
node index.js
```

#### Hot Reload Not Working (Frontend)
**Symptom:** Changes don't reflect in browser automatically
**Solutions:**
- Restart dev server: `npm run dev`
- Check Vite configuration in `vite.config.js`
- Verify file is saved
- Hard refresh browser (Ctrl+Shift+R)

#### Database Queries Slow
**Symptom:** API endpoints take long to respond
**Solutions:**
- Check MongoDB indexes are created
- Monitor network traffic in browser
- Verify MongoDB is running smoothly
- Check query optimization in controllers
- Consider adding pagination

### Production Deployment Issues

#### Build Fails
**Symptom:** `npm run build` command fails
**Solutions:**
```powershell
# Frontend build
cd frontend
npm run build

# Check for TypeScript/ESLint errors
npm run lint

# Clear cache and retry
Remove-Item -Recurse node_modules
npm install
npm run build
```

#### Environment Variables Not Loading
**Symptom:** ".env is not being read" errors
**Solutions:**
- Ensure `.env` file exists in correct directory
- Variables must be used with `process.env.VARIABLE_NAME` (Backend)
- Frontend variables must start with `VITE_` prefix
- Restart server after changing `.env`
- Check file is not in `.gitignore`

#### API Endpoints Not Accessible
**Symptom:** 404 errors when calling API
**Solutions:**
- Verify backend server is running
- Check API URL in frontend matches deployment URL
- Verify routes are registered in backend
- Check middleware order (CORS before routes)
- Verify authentication tokens are valid

---

## Conclusion

The Food Delivery Application is a comprehensive MERN stack project that demonstrates modern web development practices and enterprise-level architecture. This documentation serves as the complete technical reference for developers, administrators, and stakeholders.

### Key Achievements

✅ **Scalable Architecture** - Three-tier design allows horizontal scaling
✅ **Secure Authentication** - JWT-based authentication with password hashing
✅ **Complete Payment Integration** - Stripe for reliable payment processing
✅ **Real-time Order Tracking** - Live order status updates
✅ **Admin Dashboard** - Comprehensive management interface
✅ **Responsive Design** - Works seamlessly on desktop and mobile
✅ **API Documentation** - Complete endpoint specifications

### Technology Stack Highlights

- **Frontend:** React 19 with Vite for optimal performance
- **Backend:** Express.js with comprehensive middleware
- **Database:** MongoDB with Mongoose ODM for data modeling
- **Authentication:** Secure JWT implementation
- **Payments:** Stripe integration for transactions
- **File Handling:** Multer for image uploads

### Future Enhancements

1. **Real-time Features**
   - WebSocket integration for live order updates
   - In-app notifications for order status
   - Live chat support

2. **Advanced Features**
   - Recommendation engine for food suggestions
   - Loyalty points system
   - Scheduled ordering
   - Multi-language support

3. **Performance Improvements**
   - Implement Redis caching
   - GraphQL API option
   - Progressive Web App (PWA)
   - Advanced analytics

4. **Security Enhancements**
   - Two-factor authentication (2FA)
   - OAuth integration (Google, GitHub)
   - Enhanced DDoS protection
   - PCI DSS compliance

### Getting Help

**Documentation Resources:**
- API Endpoints: See API Documentation section
- Database Schemas: See Database Schema section
- Troubleshooting: See Troubleshooting section
- Setup Guide: See Installation & Setup section

**Community & Support:**
- Check GitHub issues for known problems
- Review logs in `backend/logs/` directory
- Monitor browser console for frontend errors
- Use browser developer tools for network debugging

### Project Maintenance

- Regular dependency updates (npm audit)
- Database backups (MongoDB dump/restore)
- Security patches application
- Performance monitoring
- User feedback integration

### Contact & Support

For issues, questions, or suggestions:
- Review documentation thoroughly
- Check troubleshooting section
- Test with provided test data
- Verify environment configuration
- Review console and application logs

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024 | Initial project setup with core features |
| 1.1 | 2024 | Added payment integration |
| 1.2 | 2024 | Enhanced admin panel |
| 1.3 | 2024 | Comprehensive documentation |

---

## Document Information

- **Document Title:** Food Delivery Application - Project Documentation
- **Project Name:** Mern Stack Food Delivery App
- **Version:** 1.3
- **Last Updated:** 2024
- **Maintained By:** Development Team
- **Status:** Active & Updated Regularly

---

## Support & Documentation

For additional help:
- Check MongoDB documentation: https://docs.mongodb.com/
- Stripe API docs: https://stripe.com/docs/api
- React documentation: https://react.dev
- Express.js guide: https://expressjs.com/

---

## License

ISC License

---

**Project Documentation Version:** 1.3  
**Last Updated:** December 2024  
**Project Name:** Food Delivery Application (Blog)  
*This documentation is a living document and will be updated as the project evolves. Please refer to the latest version for current information.*
