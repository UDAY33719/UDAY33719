# Kumar Luxury Paints ERP System

A comprehensive Enterprise Resource Planning (ERP) system built for paint manufacturing and retail businesses. This full-stack application provides complete business management capabilities including inventory, sales, purchases, accounting, and reporting.

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with role-based access control
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Winston logger with activity tracking

### Frontend (React + Vite + Tailwind CSS)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Charts**: Recharts for data visualization

## 🚀 Features

### Core Modules
- ✅ **Authentication & Authorization** - JWT login, role-based access (admin, staff, accountant)
- ✅ **Branch Management** - Multi-branch support with data isolation
- ✅ **Inventory Management** - Products, categories, units, stock tracking
- ✅ **Sales Management** - Invoice generation, GST calculations, stock deduction
- ✅ **Purchase Management** - Supplier management, stock addition, GST tracking
- ✅ **Accounting** - Double-entry bookkeeping, ledgers, journals, vouchers
- ✅ **Payments & Receipts** - Payment processing with outstanding balance tracking
- ✅ **Reports** - Trial balance, P&L, balance sheet, stock reports
- ✅ **Audit Trail** - Complete activity logging for compliance

### Business Logic
- ✅ **GST Calculations** - Automatic GST computation on transactions
- ✅ **Stock Management** - Real-time stock updates with negative stock prevention
- ✅ **Financial Accounting** - Complete double-entry accounting system
- ✅ **Multi-branch Support** - Branch-wise data isolation and management
- ✅ **Professional UI** - Tally-grade ERP interface

## 📁 Project Structure

```
kumar-luxury-paints-erp/
├── server/                          # Backend API
│   ├── config/                      # Database & environment config
│   │   ├── db.js                    # MongoDB connection
│   │   └── env.js                   # Environment variables
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js                  # User authentication
│   │   ├── Branch.js                # Branch management
│   │   ├── Product.js               # Product inventory
│   │   ├── Sale.js                  # Sales transactions
│   │   ├── Purchase.js              # Purchase orders
│   │   ├── Payment.js               # Payment records
│   │   ├── Receipt.js               # Receipt records
│   │   ├── Ledger.js                # Accounting ledgers
│   │   ├── JournalEntry.js          # Journal entries
│   │   ├── Voucher.js               # Accounting vouchers
│   │   └── ActivityLog.js           # Audit trail
│   ├── controllers/                 # Business logic
│   ├── routes/                      # API endpoints
│   ├── middleware/                  # Auth, validation, error handling
│   ├── utils/                       # Logger, activity logger
│   ├── server.js                    # Main application
│   └── package.json
└── client/                          # Frontend React App
    ├── src/
    │   ├── components/              # Reusable UI components
    │   ├── context/                 # React Context for state
    │   ├── layouts/                 # Main layout with sidebar
    │   ├── pages/                   # Application pages
    │   ├── services/                # API service layer
    │   ├── styles/                  # Tailwind CSS styles
    │   ├── App.jsx                  # Main routing component
    │   └── main.jsx                 # App entry point
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── index.html
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Backend Setup
```bash
cd server
npm install
cp .env.example .env  # Configure your environment variables
npm start
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

### Environment Configuration

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kumar-paints-erp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Kumar Luxury Paints ERP
```

## 🚀 Running the Application

1. **Start MongoDB** (if running locally)
2. **Start Backend**: `cd server && npm start`
3. **Start Frontend**: `cd client && npm run dev`
4. **Access Application**: http://localhost:5173

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Core Endpoints
- `/api/branches` - Branch management
- `/api/inventory` - Product and stock management
- `/api/sales` - Sales transactions
- `/api/purchase` - Purchase orders
- `/api/accounting` - Financial accounting
- `/api/payments` - Payments and receipts
- `/api/reports` - Business reports

## 🔐 Security Features

- **JWT Authentication** with secure token storage
- **Role-based Access Control** (admin, staff, accountant)
- **Input Validation** and sanitization
- **Rate Limiting** to prevent abuse
- **CORS Protection** for cross-origin requests
- **Helmet Security Headers**
- **Audit Logging** for all business operations

## 🎨 UI/UX Features

- **Professional ERP Design** - Clean, business-grade interface
- **Responsive Layout** - Desktop-first with mobile support
- **Keyboard Navigation** - Full keyboard accessibility
- **Loading States** - Proper feedback for all operations
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback
- **Data Tables** - Sortable, searchable, paginated

## 📈 Business Capabilities

### Inventory Management
- Product catalog with categories and units
- Real-time stock tracking
- Low stock alerts
- Batch management
- Cost and selling price tracking

### Sales & Purchase
- Invoice generation with GST calculations
- Customer and supplier management
- Payment tracking and outstanding balances
- Transaction history and reporting

### Financial Accounting
- Double-entry bookkeeping
- Ledger management
- Journal entries and vouchers
- Trial balance and financial statements
- GST compliance reporting

### Multi-branch Support
- Branch-wise data isolation
- Centralized reporting across branches
- Branch-specific user access
- Inter-branch transfers (future feature)

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
npm test       # Run tests
```

#### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

### Code Quality
- ESLint configuration for code linting
- Prettier for code formatting
- Husky for git hooks (future implementation)

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI
- [ ] Set strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

### Deployment Options
- **Vercel** (Frontend) + **Railway** (Backend)
- **Netlify** (Frontend) + **Heroku** (Backend)
- **AWS** (Full stack deployment)
- **Docker** containers for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for paint businesses seeking professional ERP solutions**
