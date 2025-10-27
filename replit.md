# Car Wash Booking Application

## Overview

A professional car wash booking platform built with React, Express, and Google Sheets as a data backend. The application allows customers to browse service packages (Basic Wash, Premium Detail, Deluxe Treatment), book appointments, and view their booking history. Features a clean, booking-platform-inspired UI with a focus on frictionless user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool.

**UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design follows a hybrid approach inspired by booking platforms (Airbnb, Booking.com) and Material Design principles.

**Routing**: Client-side routing implemented with Wouter, providing a lightweight alternative to React Router.

**State Management**: TanStack Query (React Query) for server state management with optimistic updates and caching. Form state handled by React Hook Form with Zod validation.

**Styling System**: 
- Tailwind CSS with custom design tokens
- "new-york" style variant from shadcn/ui
- Custom CSS variables for theming (light/dark mode support)
- Inter and DM Sans as primary fonts

**Key Pages**:
- Home: Hero section with service packages
- Book: Booking form with service selection
- Bookings: Dashboard for viewing appointments
- Confirmation: Post-booking success page

### Backend Architecture

**Server**: Express.js with TypeScript running in ESM mode.

**API Design**: RESTful endpoints for booking operations:
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Retrieve all bookings

**Data Validation**: Zod schemas shared between frontend and backend for type safety and validation consistency.

**Storage Layer**: Abstracted storage interface (`IStorage`) with Google Sheets implementation (`GoogleSheetsStorage`). This design allows for easy migration to traditional databases without changing business logic.

**Build Process**: 
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`

### Data Storage

**Primary Database**: Google Sheets via Google Sheets API v4.

**Schema Structure**: The `bookings` table schema is defined in Drizzle ORM format (PostgreSQL dialect) but currently mapped to Google Sheets rows:
- id (UUID primary key)
- customerName, email, phone (contact info)
- vehicleMake, vehicleModel (vehicle details)
- serviceType (enum: basic, premium, deluxe)
- appointmentDate, appointmentTime (scheduling)
- specialRequests (optional text)
- status (default: "upcoming")
- createdAt (timestamp)

**Migration Path**: The Drizzle schema and config are prepared for PostgreSQL migration. The storage abstraction allows switching from Google Sheets to PostgreSQL by implementing a new storage class.

**Data Access**: OAuth2-based authentication with Replit Connectors for Google Sheets access. Access tokens are cached and automatically refreshed.

### External Dependencies

**Google Sheets API**: Primary data storage and retrieval via googleapis package. Uses Replit Connectors for OAuth authentication with automatic token management.

**Replit Platform Services**:
- Replit Connectors for Google Sheets integration
- Vite plugins for development tools (@replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner)
- Environment variables for connector hostname and identity tokens

**Third-Party Libraries**:
- @tanstack/react-query: Data fetching and caching
- react-hook-form + @hookform/resolvers: Form management
- zod + drizzle-zod: Schema validation
- date-fns: Date formatting and manipulation
- lucide-react: Icon library
- wouter: Lightweight routing

**Database Driver**: @neondatabase/serverless prepared for PostgreSQL migration (currently unused).

**UI Component Dependencies**: Extensive Radix UI primitives for accessible component foundation (dialogs, popovers, select menus, etc.).