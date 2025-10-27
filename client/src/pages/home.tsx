import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Droplets, Star, Check } from "lucide-react";
import heroImage from "@assets/generated_images/Car_wash_hero_image_9ae8449c.png";
import { servicePackages } from "@shared/schema";
import { formatCurrency } from "@shared/utils";

export default function Home() {
  const features = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quality wash completed in 30-60 minutes",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "100% satisfaction or your money back",
    },
    {
      icon: Droplets,
      title: "Eco-Friendly",
      description: "Biodegradable products and water conservation",
    },
    {
      icon: Star,
      title: "Expert Care",
      description: "Trained professionals with years of experience",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Professional car wash"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium Car Wash & Detailing
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Professional auto care services with convenient online booking. Choose your package and get your car looking brand new.
            </p>
            <Link href="/book" asChild>
              <Button
                size="lg"
                className="text-lg h-12 px-8"
                data-testid="button-book-now-hero"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Package
            </h2>
            <p className="text-lg text-muted-foreground">
              Select the perfect service for your vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {servicePackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`relative hover-elevate ${
                  pkg.popular ? "border-2 border-primary" : ""
                }`}
                data-testid={`card-service-${pkg.id}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">
                        {formatCurrency(pkg.price)}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/book?service=${pkg.id}`} asChild>
                    <Button
                      className="w-full"
                      variant={pkg.popular ? "default" : "outline"}
                      data-testid={`button-select-${pkg.id}`}
                    >
                      Select Package
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional service you can trust
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="text-center space-y-4"
                  data-testid={`feature-${idx}`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
