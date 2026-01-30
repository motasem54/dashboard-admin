# 📊 Admin Dashboard

لوحة تحكم إدارية متكاملة مع نظام تسجيل دخول آمن وواجهة بنظام ألوان داكن.

A modern admin dashboard with secure authentication system and dark theme interface.

## ✨ Features | الميزات

- 🔐 **Secure Authentication** - نظام مصادقة آمن
  - JWT-based authentication
  - Password hashing with bcrypt
  - HTTP-only cookies
  - Session management

- 👥 **User Management** - إدارة المستخدمين
  - Users table with role-based access
  - Real-time user statistics
  - User activity tracking

- 📝 **Data Logs** - سجلات البيانات
  - Comprehensive activity logging
  - Login/logout tracking
  - IP address recording
  - User agent detection

- 🎨 **Modern UI** - واجهة عصرية
  - Dark theme design
  - Responsive layout
  - RTL support for Arabic
  - Beautiful gradient effects

- ⚡ **Performance** - الأداء
  - Next.js 15 with Turbopack
  - TypeScript for type safety
  - Optimized database queries
  - Fast page loads

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: MySQL
- **Authentication**: JWT + bcrypt
- **Styling**: CSS Modules with custom dark theme
- **Build Tool**: Turbopack

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/motasem54/dashboard-admin.git
cd dashboard-admin
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE dashboard_db;
```

### 4. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=dashboard_db

JWT_SECRET=your_super_secret_jwt_key_change_this

NEXT_PUBLIC_APP_NAME=Admin Dashboard
```

### 5. Initialize Database

The tables will be created automatically on first run. You can also manually run:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Data logs table
CREATE TABLE IF NOT EXISTS data_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

### 6. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Default Login Credentials

```
Username: admin
Password: admin123
```

**⚠️ Important**: Change the default admin password after first login!

## 📁 Project Structure

```
dashboard-admin/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── users/           # Users management
│   │   └── logs/            # Activity logs
│   ├── dashboard/           # Dashboard page
│   ├── login/               # Login page
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── db.ts                # Database connection
│   └── logger.ts            # Logging utilities
├── .env.example             # Environment variables template
├── package.json
└── tsconfig.json
```

## 📊 Features Overview

### Dashboard Statistics
- Total users count
- Total logs count
- Successful login attempts
- Failed login attempts

### Users Table
- User ID
- Username
- Email address
- User role (admin/user)
- Account creation date

### Data Logs
- Log ID
- Associated user
- Action type
- Description
- IP address
- Timestamp

## 🔒 Security Features

- Password hashing using bcrypt
- JWT tokens for session management
- HTTP-only cookies
- SQL injection prevention
- XSS protection
- CSRF protection

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize colors:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --accent: #3b82f6;
  /* ... more variables */
}
```

### Adding New Features

1. Create API route in `app/api/`
2. Add database queries in `lib/`
3. Create UI components
4. Update dashboard page

## 📦 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Make sure to set all required environment variables in production:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET` (use a strong, random secret)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users

### Logs
- `GET /api/logs?limit=50&offset=0` - Get activity logs

## ℹ️ Notes

- This dashboard uses RTL (Right-to-Left) layout for Arabic support
- Default language is Arabic, but can be changed in `app/layout.tsx`
- Database tables are created automatically on first run
- Make sure MySQL server is running before starting the app

## 🐛 Known Issues

- Admin password needs to be changed manually in database (will add UI in future)
- No user creation UI yet (will be added)
- Pagination not implemented for large datasets

## 🛣️ Roadmap

- [ ] User creation and editing UI
- [ ] Password change functionality
- [ ] Pagination for tables
- [ ] Advanced filtering and search
- [ ] Export data to CSV/Excel
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] Role-based permissions

## 📝 License

MIT License - feel free to use this project for your needs!

## 👤 Author

**Motasem**
- GitHub: [@motasem54](https://github.com/motasem54)

## 🚀 Support

If you find this project helpful, please give it a ⭐️!

---

Made with ❤️ using Next.js 15 and TypeScript
