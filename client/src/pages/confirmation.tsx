import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Confirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 lg:px-8 w-full">
        <Card>
          <CardContent className="p-12 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-bold" data-testid="text-confirmation-title">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your car wash appointment has been successfully booked
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to your email address with all the details.
              </p>
              <p className="text-sm text-muted-foreground">
                Please arrive 5 minutes before your scheduled time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/bookings" asChild>
                <Button variant="outline" size="lg" data-testid="button-view-bookings">
                  View All Bookings
                </Button>
              </Link>
              <Link href="/" asChild>
                <Button size="lg" data-testid="button-back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
