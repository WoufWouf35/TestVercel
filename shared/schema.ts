import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  vehicleMake: text("vehicle_make").notNull(),
  vehicleModel: text("vehicle_model").notNull(),
  serviceType: text("service_type").notNull(),
  appointmentDate: text("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  specialRequests: text("special_requests"),
  status: text("status").notNull().default("upcoming"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  serviceType: z.enum(["basic", "premium", "deluxe"], {
    required_error: "Please select a service package",
  }),
  appointmentDate: z.string().min(1, "Please select a date"),
  appointmentTime: z.string().min(1, "Please select a time"),
  specialRequests: z.string().optional(),
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export const servicePackages = [
  {
    id: "basic",
    name: "Basic Wash",
    price: 150000,
    features: [
      "Exterior hand wash",
      "Wheel cleaning",
      "Tire shine",
      "Quick dry",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium Detail",
    price: 300000,
    features: [
      "Everything in Basic",
      "Interior vacuuming",
      "Dashboard cleaning",
      "Window cleaning",
      "Air freshener",
    ],
    popular: true,
  },
  {
    id: "deluxe",
    name: "Deluxe Treatment",
    price: 500000,
    features: [
      "Everything in Premium",
      "Full interior detail",
      "Leather conditioning",
      "Engine bay cleaning",
      "Paint sealant",
      "Headlight restoration",
    ],
    popular: false,
  },
] as const;
