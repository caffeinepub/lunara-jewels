import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Heart, Shield } from 'lucide-react';

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
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        
        <div className="relative z-10 container text-center space-y-6 px-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight animate-fade-in">
            Lunara Jewels
          </h1>
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Timeless silver for modern souls
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto animate-fade-in">
            Discover our collection of handcrafted oxidized silver jewelry, where ancient techniques meet contemporary design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
            <Button asChild size="lg" className="text-base">
              <Link to="/shop">Explore Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Lunara
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-elegant">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <Sparkles className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Handcrafted Excellence</h3>
                <p className="text-muted-foreground">
                  Each piece is meticulously crafted by skilled artisans, ensuring unique character and exceptional quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <Heart className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Timeless Design</h3>
                <p className="text-muted-foreground">
                  Our designs blend traditional oxidized silver techniques with modern aesthetics for pieces that never go out of style.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-elegant">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <Shield className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold">Authentic Materials</h3>
                <p className="text-muted-foreground">
                  We use only genuine sterling silver, carefully oxidized to create the distinctive dark patina that defines our collection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center space-y-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Begin Your Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of oxidized silver jewelry and find pieces that resonate with your soul.
          </p>
          <Button asChild size="lg" className="text-base mt-4">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

