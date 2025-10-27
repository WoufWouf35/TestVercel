# Car Wash Booking Application - Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based (Booking Platforms) + Clean Design System Hybrid

Drawing inspiration from **Airbnb** and **Booking.com** for their clear service presentation and booking flows, combined with **Material Design** principles for form interactions and data displays. This creates a trustworthy, professional service booking experience.

**Key Design Principles:**
- Clarity in service selection and booking flow
- Professional automotive service aesthetic
- Frictionless booking experience
- Dashboard functionality for viewing appointments

---

## Core Design Elements

### A. Typography

**Font Families:**
- Primary: Inter or DM Sans (via Google Fonts)
- Headings: Bold (700), Semi-bold (600)
- Body: Regular (400), Medium (500)

**Hierarchy:**
- Hero Headline: text-5xl lg:text-6xl font-bold
- Section Headings: text-3xl lg:text-4xl font-bold
- Subheadings: text-xl lg:text-2xl font-semibold
- Service Titles: text-lg font-semibold
- Body Text: text-base
- Form Labels: text-sm font-medium
- Helper Text: text-sm
- Pricing: text-2xl lg:text-3xl font-bold

### B. Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, h-8, m-12, py-20)

**Container Strategy:**
- Full-width sections: w-full with inner max-w-7xl mx-auto px-4 lg:px-8
- Content sections: max-w-6xl mx-auto
- Forms: max-w-2xl mx-auto
- Dashboard tables: max-w-7xl mx-auto

**Grid Layouts:**
- Service packages: grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8
- Feature highlights: grid grid-cols-2 lg:grid-cols-4 gap-8
- Dashboard bookings: Single column table/card layout

**Section Padding:**
- Desktop: py-20 lg:py-24
- Mobile: py-12
- Hero: py-24 lg:py-32

---

## Component Library

### 1. Hero Section
**Layout:** Full-width with max-height of 85vh
- Left-aligned content with 50% width on desktop
- Headline + supporting text + primary CTA
- Background: Large hero image showing clean, shiny car being washed (professional automotive photography)
- Button treatment: Backdrop blur (backdrop-blur-md bg-white/20) for CTA positioned over image

### 2. Service Selection Cards
**Structure:** Three-column grid on desktop (Basic, Premium, Deluxe)
- Card elevation with subtle shadow (shadow-lg hover:shadow-xl transition)
- Each card includes:
  - Service icon/image at top
  - Service name (text-xl font-semibold)
  - Price prominently displayed (text-3xl font-bold)
  - Bulleted feature list (4-6 items with checkmark icons)
  - "Select Package" button (full-width w-full)
- Recommended package: Border accent (border-2) with "Popular" badge

### 3. Booking Form
**Layout:** Two-column on desktop, single-column on mobile
- Generous spacing between form groups (space-y-6)
- Left Column: Customer Information
  - Name (full-width input)
  - Phone (tel input with validation pattern)
  - Email (email input)
  - Vehicle Make/Model (text input)
- Right Column: Appointment Details
  - Selected Service (read-only display showing chosen package)
  - Date picker (calendar interface)
  - Time slot selector (grid of available times)
  - Special requests (textarea, rows-4)

**Form Input Styling:**
- Consistent height: h-12
- Padding: px-4
- Border radius: rounded-lg
- Focus states with ring utility classes
- Label positioning: Above input with mb-2

### 4. Features Section
**Layout:** Four-column grid on desktop
- Icon + Title + Description pattern
- Icons from Heroicons (outline style): Clock (fast service), Shield (quality), Droplets (eco-friendly), Star (satisfaction)
- Center-aligned text
- Spacing: gap-8 lg:gap-12

### 5. Dashboard/Bookings View
**Structure:** Clean table or card-based list
- Header with "Your Bookings" title and filter options
- Each booking displays:
  - Date/Time (prominent, text-lg font-semibold)
  - Service type
  - Customer name
  - Vehicle info
  - Status badge (Upcoming/Completed/Cancelled)
- Action buttons: View Details, Cancel (if applicable)
- Empty state: Centered message with illustration placeholder + CTA to book

### 6. Confirmation Page
**Layout:** Centered card (max-w-2xl)
- Success icon (large checkmark, size-16)
- "Booking Confirmed" heading
- Appointment summary in clean list format:
  - Service type
  - Date & Time
  - Vehicle
  - Total price
- Two CTAs: "Add to Calendar" + "View All Bookings"

### 7. Navigation
**Header:** Fixed top navigation
- Logo left-aligned
- Navigation links center (Home, Services, Book Now, My Bookings)
- CTA button right-aligned
- Mobile: Hamburger menu with slide-out drawer

**Footer:** Three-column layout
- Column 1: Logo + tagline
- Column 2: Quick links (Services, About, Contact, Privacy)
- Column 3: Contact info + social media icons
- Bottom bar: Copyright text

### 8. Trust Elements
**Placement:** Below hero or above footer
- Customer testimonials: 2-column grid with quote cards
- Statistics bar: 4-column (Customers Served, 5-Star Reviews, Years in Business, Cars Washed)

---

## Images

### Hero Image
**Description:** Professional automotive photography showing a luxury car being detailed/washed with water spray creating dramatic effect. Image should convey cleanliness, professionalism, and attention to detail.
**Placement:** Full-width background of hero section with gradient overlay (darker at bottom for text contrast)

### Service Package Images
**Description:** Three supporting images showing different wash levels - basic exterior wash, premium interior detail, deluxe full treatment
**Placement:** Top of each service card (aspect-ratio-video, rounded-t-lg)

### Feature Section
**Description:** Icon-based (no images), using outline icons from Heroicons

---

## Animations

**Minimal, purposeful animations only:**
- Smooth scroll to booking form on CTA click
- Card hover elevations (shadow transitions)
- Form input focus states (no elaborate animations)
- Success checkmark animation on confirmation page (simple scale-in)

---

## Accessibility

- All form inputs have associated labels with proper for/id relationships
- Color contrast meets WCAG AA standards
- Focus indicators visible and clear (ring-2 ring-offset-2)
- Semantic HTML structure (header, nav, main, section, footer)
- ARIA labels for icon-only buttons
- Skip navigation link for keyboard users