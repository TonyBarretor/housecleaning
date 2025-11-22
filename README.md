# Premium House Cleaning Service - Web Application

A complete, elegant, premium-style web application for a high-end house cleaning service business. Built with Next.js, TypeScript, Prisma, and Stripe.

## 🌟 Features

### Client-Facing Features
- **Premium Landing Page** - Elegant design with hero section, features, pricing, testimonials, and CTA
- **Live Calendar Booking** - Interactive calendar for scheduling free estimates
- **Pre-Quote Estimator** - Instant price estimates based on bedrooms, bathrooms, and service type
- **Personalized Quote Page** - Custom pricing offers sent via email
- **Secure Payments** - Stripe integration for safe online payments
- **Email Notifications** - Automated confirmations for bookings, quotes, and payments
- **Mobile-First Design** - Optimized for Instagram traffic and mobile devices
- **SEO & OpenGraph** - Full meta tags for social sharing

### Admin Features
- **Admin Dashboard** - Comprehensive view of appointments, quotes, and revenue
- **Appointment Management** - View and manage all client bookings
- **Custom Quote Creation** - Set personalized pricing for each client
- **Client Database** - Track all clients and their service history
- **Secure Authentication** - Protected admin routes with NextAuth

### Premium Design Elements
- **Color Scheme** - White, champagne, navy blue, and gold accents
- **Framer Motion Animations** - Smooth, professional animations throughout
- **Responsive Design** - Looks beautiful on all devices
- **Trust Indicators** - Background-checked badges, satisfaction guarantees

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Email**: Nodemailer
- **Form Handling**: React Hook Form + Zod validation
- **Date Handling**: date-fns

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Stripe account (for payments)
- SMTP credentials (Gmail, SendGrid, etc.)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard
- `STRIPE_SECRET_KEY` - From Stripe dashboard
- `STRIPE_WEBHOOK_SECRET` - From Stripe CLI or dashboard
- `SMTP_*` - Your email service credentials

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### 4. Create Admin User

Create an admin user in the database:

```typescript
// Run in Prisma Studio or create a script
import bcrypt from 'bcryptjs'

// Hash password
const hashedPassword = await bcrypt.hash('your-password', 10)

// Create admin in database with:
// email: admin@example.com
// name: Admin User
// password: [hashed password]
```

### 5. Setup Stripe Webhook (Development)

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/payment/webhook
```

Copy the webhook secret to your `.env` file.

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 📁 Project Structure

```
housecleaning/
├── app/                       # Next.js app directory
│   ├── api/                  # API routes
│   ├── admin/                # Admin pages
│   ├── book/                 # Booking page
│   ├── quote/[id]/          # Quote view page
│   └── payment/success/     # Payment confirmation
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── forms/               # Form components
│   └── sections/            # Landing page sections
├── lib/                     # Utilities and configurations
├── emails/                  # Email templates
├── prisma/                  # Database schema
└── types/                   # TypeScript types
```

## 🔐 Authentication

Admin dashboard is protected with NextAuth.js.

**Login**: `/admin/login`

Use the admin credentials you created in the database.

## 💳 Stripe Integration

### Test Payment

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-factor authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in `SMTP_PASSWORD`

## 🌐 Deployment to Vercel

1. Push code to GitHub
2. Import to Vercel: https://vercel.com/import
3. Add all environment variables
4. Deploy!

### Post-Deployment

- Update Stripe webhook URL to production
- Run database migrations: `npx prisma migrate deploy`
- Test the complete flow

## 📱 User Flow

1. **Client sees Instagram ad** → Clicks "Book Free Estimate"
2. **Fills booking form** → Selects date/time, enters details
3. **Receives confirmation** → Email with appointment details
4. **Admin visits home** → Assesses cleaning needs
5. **Admin creates quote** → Sets custom pricing
6. **Client receives quote** → Email with personalized pricing
7. **Client accepts & pays** → Stripe checkout
8. **Payment confirmation** → Email with service details
9. **Scheduled service** → Professional cleaning

## 🎨 Customization

### Brand Colors

Edit `app/globals.css`:

```css
--navy-900: #1a2332;
--champagne-200: #f5f1ea;
--gold-500: #c9a04a;
```

### Email Templates

Modify `emails/templates.ts`

## 🔧 Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npx prisma studio    # Database GUI
npx prisma migrate dev # Create migration
```

## 🐛 Troubleshooting

**Database connection failed**: Check `DATABASE_URL` format
**Stripe webhook not working**: Ensure Stripe CLI is running
**Emails not sending**: Verify SMTP credentials

## 📊 Features Checklist

- ✅ Landing page with premium design
- ✅ Live calendar booking
- ✅ Pre-quote estimator
- ✅ Admin dashboard
- ✅ Quote creation & management
- ✅ Stripe payment integration
- ✅ Email notifications
- ✅ SEO & OpenGraph tags
- ✅ Framer Motion animations
- ✅ Mobile responsive

## 🎉 Credits

Built with Next.js, Prisma, Stripe, Tailwind CSS, and Framer Motion.

---

**Happy Cleaning! 🏠✨**
