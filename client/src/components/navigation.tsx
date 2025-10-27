import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/book", label: "Book Now" },
    { path: "/bookings", label: "My Bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 -ml-3 cursor-pointer" data-testid="link-logo">
              <Droplets className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">Premium Wash</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} asChild>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} asChild>
                <Button
                  size="sm"
                  variant={location === item.path ? "default" : "ghost"}
                  data-testid={`link-nav-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
