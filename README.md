# The Regentonians Benevolent Fund (RBF) - Charity Website

A clean, professional MVP charity website for The Regentonians Benevolent Fund, providing compassionate welfare support to alumni of Sierra Leone Grammar School.

## 🎯 Project Overview

Full-stack MVP built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and MongoDB. Includes complete admin system for managing events and contact form submissions.

### Core Features

- ✅ Responsive design (mobile and desktop)
- ✅ Contact form with MongoDB backend + email notifications
- ✅ Events management with MongoDB backend
- ✅ Admin authentication & dashboard (CRUD operations)
- ✅ Professional email templates (Resend)
- ✅ Dialog and AlertDialog components (shadcn/ui)
- ✅ Smooth animations and transitions

### Pages

- **Home** - Overview with hero, what we do, support pillars, and CTAs
- **About Us** - Mission, values, who we support, and fund operations
- **Support We Provide** - Bereavement, Get Well Soon, and Milestone Birthdays
- **Events** - Community events listing (responsive grid, MongoDB-backed)
- **How to Join** - Membership information and signup process
- **Contact** - Contact form with backend + email notifications
- **Sign In** - Admin authentication (`/sign-in`)
- **Admin/Events** - Protected admin dashboard (`/admin/events`)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier available)
- Resend account (for email notifications)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The site will be available at `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# MongoDB (REQUIRED)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rbf-charity?retryWrites=true&w=majority

# Resend Email Service (REQUIRED for contact form notifications)
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=RBF Charity <onboarding@resend.dev>  # Use your domain in production
EMAIL_TO=contact@rbf-charity.org
EMAIL_REPLY_TO=contact@rbf-charity.org

# Stripe (Optional - for future donations)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## 🔑 Admin Access

**Login Credentials:**

- **Username**: `rbf-admin`
- **Password**: `@Qwerty7890`
- **URL**: `/sign-in`

**Admin Features:**

- Create, edit, and delete events
- Toggle event active/inactive status
- Session-based authentication (24-hour duration)

## ✅ What's Been Completed

### Backend & Database

- ✅ MongoDB integration with Mongoose (✅ Verified & Working)
- ✅ Contact form submissions stored in database
- ✅ Events CRUD operations with MongoDB
- ✅ Email notifications (Resend integration - ✅ Verified & Working)
- ✅ Professional email templates

### Authentication & Admin

- ✅ Admin authentication system (session-based)
- ✅ Protected admin routes
- ✅ Full CRUD operations for events
- ✅ Dialog and AlertDialog components

### Frontend

- ✅ All 6 core pages implemented
- ✅ Responsive navigation with mobile menu
- ✅ Events page with responsive grid layout (1/2/3 columns)
- ✅ Hero components with consistent backgrounds
- ✅ Smooth animations and transitions
- ✅ Mobile responsive design tested and verified
- ✅ Contact form tested and working
- ✅ Admin dashboard tested and working

## 🎯 Next Steps (Priority Order)

### 1. **MongoDB Setup** ✅ COMPLETE

**Status**: Verified and working

- ✅ MongoDB Atlas account set up
- ✅ Database cluster created and connected
- ✅ Connection string configured
- ✅ Tested and verified working

### 2. **Resend Email Setup** ✅ COMPLETE

**Status**: Verified and working

- ✅ Resend account created
- ✅ API key configured
- ✅ Email notifications working
- ✅ Contact form sends emails successfully

### 3. **Content & Logo** (High Priority - Next Step)

**Time**: 1-2 hours  
**Status**: Ready to start - This is the final step before launch!

- [ ] Replace placeholder content with final copy
- [ ] Add logo to navigation and footer
- [ ] Update email addresses in contact page (if needed)
- [ ] Create favicon from logo

**Files to update:**

- `app/page.tsx` (Home)
- `app/about/page.tsx`
- `app/support/page.tsx`
- `app/join/page.tsx`
- `app/contact/page.tsx`
- `components/navigation.tsx` (for logo)
- `components/footer.tsx` (for logo)

### 4. **Image Replacement** (Medium Priority)

**Time**: 1-2 hours

- [ ] Replace Unsplash placeholder images with real photos
- [ ] Optimize images for web
- [ ] Add proper alt text for accessibility

### 5. **Stripe Donations** (Future Enhancement)

**Time**: 2-3 hours

- [ ] Set up Stripe account
- [ ] Implement donation functionality
- [ ] Add donation CTAs throughout site

### 6. **SEO & Analytics** (Post-Launch)

**Time**: 1-2 hours

- [ ] Add page-specific metadata
- [ ] Set up Google Analytics
- [ ] Create sitemap.xml

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Email**: Resend
- **Icons**: Lucide React
- **Fonts**: Inter (body), Playfair Display (headings)

## 📁 Project Structure

```
rbf-charity/
├── app/
│   ├── api/              # API routes (auth, contact, events)
│   ├── admin/            # Admin dashboard (protected)
│   ├── about/            # About Us page
│   ├── contact/          # Contact page
│   ├── events/           # Events page
│   ├── join/             # How to Join page
│   ├── support/          # Support We Provide page
│   └── sign-in/          # Admin sign-in
├── backend/
│   ├── auth/             # Authentication utilities
│   ├── db/               # Database connection
│   ├── email/            # Email service (Resend)
│   └── models/           # Mongoose models
├── components/
│   ├── ui/               # shadcn/ui components
│   └── ...               # Other components
└── lib/                  # Utility functions
```

## 🎨 Design System

- **Colors**: Purple (primary), Silver (secondary), White
- **Typography**: Playfair Display (headings), Inter (body)
- **Animations**: Fade-in, slide, scale effects

## 🚢 Deployment

### Recommended Platform

- **Vercel** (recommended for Next.js)

### Deployment Checklist

- [x] Backend tested and verified
- [x] Contact form tested
- [x] Admin dashboard tested
- [x] Mobile responsive verified
- [ ] Replace content and add logo
- [ ] Set environment variables in hosting platform
- [ ] Configure custom domain
- [ ] Test production build
- [ ] Set up monitoring

## 📞 Support

For questions or issues, please contact the development team.

---

**Last Updated**: 2026  
**Status**: ✅ PRD Complete & Tested - Ready for Content & Launch Prep

**PRD Compliance:** ✅ **100%** - All requirements met and exceeded!

**Current Status:**

- ✅ MongoDB: Verified and working
- ✅ Email Notifications: Verified and working
- ✅ Contact Form: Tested and working
- ✅ Admin Dashboard: Tested and working
- ✅ Mobile Responsive: Tested and verified
- ✅ All 6 core pages implemented
- ✅ All required features complete
- ⏳ Next: Content replacement and logo integration

**See `PRD_COMPARISON.md` for detailed comparison with original requirements.**
