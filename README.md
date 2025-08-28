# 404studios Website

A modern, high-performance website for 404studios - a professional web development studio specializing in React, Next.js, and mobile app development.

## 🚀 Built With

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + Custom CSS Variables
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Runtime**: Edge Runtime for optimal performance

## ✨ Features

- 🎨 **Modern UI/UX**: Glass morphism design with particle effects
- ⚡ **High Performance**: Edge Runtime middleware, optimized loading
- 📱 **Fully Responsive**: Mobile-first design approach
- 🔍 **SEO Optimized**: Structured data, meta tags, sitemap
- 🛡️ **Security**: Rate limiting, CORS, security headers
- 📊 **Analytics**: Built-in analytics tracking
- 🎯 **Contact Forms**: Multi-step contact form with validation

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── contact/           # Contact page
│   ├── features/          # Features showcase
│   ├── packages/          # Package offerings
│   ├── pricing/           # Pricing calculator
│   └── services/          # Services overview
├── components/            # Reusable UI components
├── src/features/          # Feature-based modules
├── lib/                   # Utilities and configurations
├── hooks/                 # Custom React hooks
└── public/                # Static assets
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd 404studios-website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

## 🌐 API Endpoints

- `/api/health` - Health check endpoint
- `/api/contact` - Contact form submission
- `/api/analytics` - Analytics tracking

## 📞 Contact Information

- **Phone**: +91-7845890089, +91-9489153545
- **Email**: vishwaadeveloper@gmail.com, contact@404studios.com
- **Location**: Coimbatore, Tamil Nadu, India

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_SITE_URL=https://404studios.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Security Features

- Rate limiting (100 requests/minute per IP)
- CORS protection for API routes
- Security headers (CSP, HSTS, X-Frame-Options)
- Input validation and sanitization

## 📈 Performance

- Edge Runtime middleware for optimal performance
- Lazy loading for images and components
- Optimized bundle sizes
- Progressive Web App (PWA) ready

## 🚀 Deployment

The website is optimized for deployment on Vercel, Netlify, or any platform supporting Next.js.

```bash
# Build for production
pnpm build

# The build output will be in .next/
```

## 📄 License

© 2025 404studios. All rights reserved.

---

Built with ❤️ by 404studios team
