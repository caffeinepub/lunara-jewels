import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Heart, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/lunara-jewels-hero.dim_1920x900.png"
            alt="Lunara Jewels Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 container text-center space-y-6 px-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight animate-fade-in text-white drop-shadow-lg">
            Lunara Jewels
          </h1>
          <p className="font-serif text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-fade-in drop-shadow">
            Timeless silver for modern souls
          </p>
          <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto animate-fade-in drop-shadow">
            Discover our collection of handcrafted oxidized silver jewelry,
            where ancient techniques meet contemporary design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
            <Button asChild size="lg" className="text-base">
              <Link to="/shop">Explore Collection</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base bg-white/10 border-white/60 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Lunara
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-elegant">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Handcrafted Excellence
                </h3>
                <p className="text-foreground/70">
                  Each piece is meticulously crafted by skilled artisans,
                  ensuring unique character and exceptional quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <Heart className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Timeless Design
                </h3>
                <p className="text-foreground/70">
                  Our designs blend traditional oxidized silver techniques with
                  modern aesthetics for pieces that never go out of style.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Authentic Materials
                </h3>
                <p className="text-foreground/70">
                  We use only genuine sterling silver, carefully oxidized to
                  create the distinctive dark patina that defines our
                  collection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Begin Your Journey
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore our curated collection of oxidized silver jewelry and find
            pieces that resonate with your soul.
          </p>
          <Button asChild size="lg" className="text-base mt-4">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
