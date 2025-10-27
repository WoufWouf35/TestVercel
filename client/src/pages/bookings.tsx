import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, Car, User, FileText } from "lucide-react";
import type { Booking } from "@shared/schema";
import { servicePackages } from "@shared/schema";
import { formatCurrency } from "@shared/utils";

export default function Bookings() {
  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const getServiceName = (serviceType: string) => {
    const pkg = servicePackages.find((p) => p.id === serviceType);
    return pkg?.name || serviceType;
  };

  const getServicePrice = (serviceType: string) => {
    const pkg = servicePackages.find((p) => p.id === serviceType);
    return pkg?.price || 0;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen py-12 lg:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              Your Bookings
            </h1>
            <p className="text-lg text-muted-foreground">
              View and manage your car wash appointments
            </p>
          </div>
          <Link href="/book" asChild>
            <Button size="lg" data-testid="button-new-booking">
              New Booking
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !bookings || bookings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No Bookings Yet</h3>
              <p className="text-muted-foreground">
                You haven't made any car wash appointments yet.
              </p>
              <Link href="/book" asChild>
                <Button className="mt-4" data-testid="button-book-first">
                  Book Your First Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card
                key={booking.id}
                className="hover-elevate"
                data-testid={`card-booking-${booking.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">
                              {getServiceName(booking.serviceType)}
                            </h3>
                            <Badge
                              variant={
                                booking.status === "upcoming"
                                  ? "default"
                                  : booking.status === "completed"
                                  ? "secondary"
                                  : "outline"
                              }
                              data-testid={`badge-status-${booking.id}`}
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(getServicePrice(booking.serviceType))}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium" data-testid={`text-date-${booking.id}`}>
                              {formatDate(booking.appointmentDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-medium" data-testid={`text-time-${booking.id}`}>
                              {booking.appointmentTime}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Customer</p>
                            <p className="font-medium">{booking.customerName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle</p>
                            <p className="font-medium">
                              {booking.vehicleMake} {booking.vehicleModel}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="flex items-start gap-3 pt-2 border-t">
                          <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm text-muted-foreground">Special Requests</p>
                            <p className="text-sm">{booking.specialRequests}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
