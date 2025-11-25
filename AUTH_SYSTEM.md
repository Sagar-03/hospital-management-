# Authentication System

## Overview
A role-based authentication modal system that redirects users to different dashboards based on their email credentials.

## Features

### Sign In / Sign Up Modal
- ✅ Beautiful modal with gradient design
- ✅ Toggle between Sign In and Sign Up modes
- ✅ Form validation
- ✅ Demo credentials display
- ✅ Smooth animations and transitions
- ✅ Click outside to close
- ✅ Responsive design

### Role-Based Routing
The system automatically redirects users based on their email:

| Email | Role | Redirect To |
|-------|------|-------------|
| `patient@metaai.com` | Patient | `/patient-dashboard/home` |
| `doctor@metaai.com` | Doctor | `/dashboard` |
| `admin@metaai.com` | Admin | `/admin/dashboard` |

### Access Points

#### 1. Navbar
- **Login Button**: Opens the auth modal
- **Get Started Button**: Opens the auth modal
- Located in the top navigation bar

#### 2. Hero Section
- **Get Started Button**: Primary CTA button
- **Sign In Button**: Secondary button
- Both open the auth modal

## Usage

### Demo Credentials
Use any of these emails to test the system:
- **Patient Portal**: `patient@metaai.com` (any password)
- **Doctor Portal**: `doctor@metaai.com` (any password)
- **Admin Portal**: `admin@metaai.com` (any password)

### Sign Up
1. Click "Sign Up" in the modal
2. Enter your name, email, password, and confirm password
3. Click "Sign Up" button
4. System validates and redirects based on email

### Sign In
1. Click "Login" or "Get Started" button
2. Enter email and password
3. Click "Sign In" button
4. System redirects to appropriate dashboard

## Components

### AuthModal Component
**Location**: `src/components/Auth/AuthModal.jsx`

**Props**:
- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback to close modal

**Features**:
- Form validation
- Password confirmation for sign up
- Error messages
- Demo credentials display
- Mode switching (Sign In/Sign Up)

### Updated Components

#### Navbar
- Added "Login" button with user icon
- Changed "Doctor Portal" to "Get Started"
- Both buttons open AuthModal

#### Hero
- Changed "Patient Portal" to "Get Started"
- Changed "Doctor Portal" to "Sign In"
- Both buttons open AuthModal

## Styling

### Color Scheme
- Primary Gradient: `#667eea` → `#764ba2`
- Background: White with subtle gradients
- Error: Red tones for validation messages
- Success: Green tones (future implementation)

### Animations
- Modal fade in/out
- Slide up animation for modal content
- Smooth transitions on all interactive elements
- Rotate animation on close button hover

## Security Notes
⚠️ **Important**: This is a demo authentication system for UI/UX purposes only.

For production use, you should:
- Implement proper backend authentication
- Use secure password hashing
- Add JWT tokens or session management
- Implement proper authorization checks
- Add rate limiting
- Use HTTPS
- Add CSRF protection
- Implement proper error handling

## Future Enhancements
- [ ] Remember me functionality
- [ ] Forgot password flow
- [ ] Email verification
- [ ] Social login (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Session management
- [ ] Logout functionality
- [ ] Profile picture upload
- [ ] Password strength indicator
- [ ] Real-time validation

## File Structure
```
src/
├── components/
│   ├── Auth/
│   │   ├── AuthModal.jsx
│   │   └── AuthModal.module.css
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
│   └── Hero/
│       ├── Hero.jsx
│       └── Hero.module.css
```

## Status
✅ **COMPLETE** - Authentication modal with role-based routing is fully functional.
