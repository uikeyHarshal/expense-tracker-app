#  SmartSpend - Full-Stack MERN Expense Tracker & Budget Manager

A modern, production-grade Expense Tracker and Personal Finance Management web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), styled with **Tailwind CSS**, and powered by **Recharts** interactive data visualizations.

---

##  Key Features

- **Authentication & Security**
  - Secure user registration and login with JWT (JSON Web Tokens) and bcrypt password hashing.
  - ** 1-Click Instant Demo Login**: Instant evaluation without typing credentials.
  - Multi-currency support (`$ USD`, `₹ INR`, `€ EUR`, `£ GBP`, `¥ JPY`, `C$ CAD`, `A$ AUD`, `CHF`).

-  **Interactive Financial Analytics & Dashboard**
  - **Net Balance & Cashflow Metrics**: Real-time calculation of total balance, monthly income, monthly expenses, and savings rate.
  - **Cashflow Trends**: Smooth Area Charts visualizing income vs expenses over time.
  - **Expense Category Breakdown**: Interactive Doughnut chart and percentage rankings for spending categories.
  - **Monthly Comparison**: Side-by-side Bar Charts comparing revenues vs outflows.

-  **Comprehensive Transaction Management**
  - Add, edit, and delete Income and Expense transactions.
  - Categorization (Food & Dining, Shopping, Housing, Utilities, Transportation, Entertainment, Health, Education, Salary, Freelance, Investments, etc.).
  - Payment method tagging (`Cash`, `Credit Card`, `Debit Card`, `Bank Transfer`, `UPI`, `PayPal`).
  - Search, filter by category/type/payment method, and sort transactions.
  - Pagination for high-volume transaction records.
  - ** 1-Click CSV Export**: Download transaction history for spreadsheet analysis.

-  **Category Budgets & Savings Goals**
  - Set monthly spending limits per category.
  - Real-time progress bars with safety color thresholds (Green `< 75%`, Amber `75-90%`, Red `> 90%` or Exceeded).
  - Target-based savings goals with deadline countdowns and funds contribution tracking.

-  **Modern Design & UX**
  - Dark / Light Mode with automatic theme detection and persistence.
  - Responsive mobile-first interface with smooth animations and toast notifications.
  - Resilient backend database architecture with automatic MongoDB in-memory fallback.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, Axios |
| **Backend** | Node.js, Express.js, JSON Web Tokens (JWT), BcryptJS, Morgan |
| **Database** | MongoDB & Mongoose (with MongoDB Memory Server fallback for dev) |


---

##  Project Structure

```
expennse-trackerapp/
├── package.json               # Root scripts (concurrently runs client + server)
├── README.md
├── server/
│   ├── package.json
│   ├── .env                   # Environment configurations
│   ├── server.js              # Express API entry point
│   ├── config/
│   │   └── db.js              # Resilient MongoDB connection
│   ├── models/
│   │   ├── User.js            # User authentication schema
│   │   ├── Transaction.js     # Financial transactions schema
│   │   ├── Budget.js          # Monthly budget limits schema
│   │   └── Goal.js            # Target savings goals schema
│   ├── middleware/
│   │   ├── auth.js            # JWT protection middleware
│   │   └── errorHandler.js    # Central error handler & 404 handler
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   ├── budgetController.js
│   │   └── goalController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── budgetRoutes.js
│   │   └── goalRoutes.js
│   └── utils/
│       └── seeder.js          # Demo data generator
└── client/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── context/
        │   ├── AuthContext.jsx
        │   ├── TransactionContext.jsx
        │   └── ThemeContext.jsx
        ├── services/
        │   └── api.js
        ├── components/
        │   ├── common/        # Navbar, Sidebar, StatCard, Toast, Modal, Dialogs
        │   ├── dashboard/     # Metrics, Charts, Recent Activity, Budget Widget
        │   ├── transactions/  # Filters, Table, Modals
        │   ├── budgets/       # BudgetCards, GoalCards, Contribution Modals
        │   └── analytics/     # Overview, Breakdown, Spending Trends
        ├── pages/
        │   ├── DashboardPage.jsx
        │   ├── TransactionsPage.jsx
        │   ├── BudgetsPage.jsx
        │   ├── AnalyticsPage.jsx
        │   ├── ProfilePage.jsx
        │   ├── LoginPage.jsx
        │   └── RegisterPage.jsx
        └── utils/
            ├── constants.js
            └── formatters.jsx
```

---

##  Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- *(Optional)* Local MongoDB or MongoDB Atlas URI (If not present, the app automatically boots with an in-memory database)

### Installation

1. **Clone the repository and install all dependencies:**
```bash
# In the root project directory:
npm run install-all
```

2. **Configure Environment Variables (Optional):**
A default `server/.env` is already configured. You can customize `PORT`, `MONGODB_URI`, and `JWT_SECRET` inside `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/expense_tracker
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. **Run the Full Application (Backend + Frontend):**
```bash
npm run dev
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api`

---

## 📡 REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate user & receive JWT
- `POST /api/auth/demo` - 1-Click demo account login & seed
- `GET /api/auth/me` - Get current authenticated user profile
- `PUT /api/auth/profile` - Update profile, preferred currency, or password

### Transactions (`/api/transactions`)
- `GET /api/transactions` - Fetch transactions with search, category/type filter, sort & pagination
- `GET /api/transactions/summary` - Get lifetime and monthly metrics, category distributions, monthly trends
- `GET /api/transactions/export` - Export transactions as CSV file
- `POST /api/transactions` - Create a new income/expense entry
- `GET /api/transactions/:id` - Get transaction details by ID
- `PUT /api/transactions/:id` - Update transaction by ID
- `DELETE /api/transactions/:id` - Delete transaction by ID

### Budgets (`/api/budgets`)
- `GET /api/budgets` - Fetch category budgets with real-time spend calculations
- `POST /api/budgets` - Set or update a monthly category budget limit
- `DELETE /api/budgets/:id` - Delete a category budget

### Savings Goals (`/api/goals`)
- `GET /api/goals` - Fetch all target savings goals with percentage reached
- `POST /api/goals` - Create a new target goal
- `PUT /api/goals/:id` - Update goal details or deposit funds
- `DELETE /api/goals/:id` - Delete a goal

---

##  Demo Account Credentials

For quick evaluation without manual signup:
- Click **" Explore with 1-Click Demo Account"** on the login page, OR
- **Email**: `demo@expensetracker.com`
- **Password**: `demopassword123`



