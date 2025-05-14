# TimeLog - Modern Attendance & Time Tracking Application

A modern, feature-rich attendance and time tracking application built with a clean, modular architecture using React, TypeScript, and modern frontend tooling.

## 🚀 Features

- **User Authentication** - Secure sign-in/sign-up with OTP verification
- **Attendance Tracking** - Easy check-in/check-out functionality
- **Attendance History** - View and manage historical attendance records
- **User Management** - Admin controls for managing users
- **Responsive Design** - Works seamlessly across desktop and mobile devices
- **Theme Support** - Light/dark mode with consistent design system

## 🛠️ Tech Stack

- **React 19** with **TypeScript**
- **TanStack Router** for type-safe routing
- **TanStack Query v5** for data fetching and state management
- **Tailwind CSS v4** for styling
- **ShadCN UI** for component primitives
- **Zod** for schema validation
- **React Hook Form** for form handling
- **Zustand** for global state management
- **Vite** for blazing fast development experience

## 🏛️ Architecture

The project follows a clean, feature-based modular architecture:

```
/src
  /assets             → Static assets (icons, logos)
  /components
    /layout           → App layout wrappers (Header, Sidebar)
    /ui               → ShadCN primitives (Button, Input, Card, etc.)
  /config             → App-wide config (env, constants)
  /context            → React context providers
  /features           → Feature-based modules
    /auth             → Login, register, session handling
    /attendance       → Check-in/check-out UI + logic
    /attendance-history → Historical attendance records
    /users            → User management
    ...
  /hooks              → Custom reusable hooks
  /lib                → Core libraries
  /routes             → App routing setup
    /_authenticated   → Auth-protected routes
    /(auth)           → Public routes (login, register)
    /(errors)         → Error pages (404, 500)
  /services           → API layer
  /stores             → Global state
  /utils              → Shared utility functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd timelog-fe
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Check for linting issues
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check formatting without making changes
- `npm run knip` - Find unused dependencies and code

## 🧪 Data Management

TimeLog leverages a modern, declarative data-fetching strategy using TanStack Query to keep your data fresh and responsive. Whether you're checking in, checking out, or reviewing records, the app ensures your data stays up-to-date automatically—no page refreshes needed. This results in a fast, seamless user experience with real-time consistency.

## 📐 Form Handling & Validation

Forms in TimeLog are designed to be user-friendly and error-resistant. Built with a schema-based validation approach, every input is checked against clearly defined rules. This ensures consistent, reliable form behavior across the app, giving users immediate feedback and preventing invalid submissions before they happen.

## 🔒 Authentication

Authentication is handled using JWT tokens with secure storage, automatic refresh, and protected routes.

## 🎨 UI Components

The application uses ShadCN UI components, customized with Tailwind CSS for a consistent design system.

## 📝 License

Licensed under the [MIT License](LICENSE). See the LICENSE file for more details.

---

Crafted by [@ryhn7](https://github.com/ryhn7) X [@satnaing](https://github.com/satnaing)
