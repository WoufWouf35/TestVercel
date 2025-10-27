import { type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";
import { appendBooking, getAllBookings, type BookingRow } from "./google-sheets";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
}

export class GoogleSheetsStorage implements IStorage {
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const createdAt = new Date();
    
    const booking: Booking = {
      ...insertBooking,
      id,
      status: "upcoming",
      createdAt,
    };

    const bookingRow: BookingRow = {
      id: booking.id,
      customerName: booking.customerName,
      email: booking.email,
      phone: booking.phone,
      vehicleMake: booking.vehicleMake,
      vehicleModel: booking.vehicleModel,
      serviceType: booking.serviceType,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
      specialRequests: booking.specialRequests || '',
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
    };

    await appendBooking(bookingRow);
    
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const rows = await getAllBookings();
    
    return rows.map((row) => ({
      id: row.id,
      customerName: row.customerName,
      email: row.email,
      phone: row.phone,
      vehicleMake: row.vehicleMake,
      vehicleModel: row.vehicleModel,
      serviceType: row.serviceType,
      appointmentDate: row.appointmentDate,
      appointmentTime: row.appointmentTime,
      specialRequests: row.specialRequests || null,
      status: row.status,
      createdAt: new Date(row.createdAt),
    }));
  }
}

export const storage = new GoogleSheetsStorage();
