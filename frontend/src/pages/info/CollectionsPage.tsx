import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Crown, Gift } from 'lucide-react';

export default function CollectionsPage() {
  const categories = [
    {
      icon: Sparkles,
      title: 'Rings',
      description: 'Handcrafted oxidized silver rings featuring intricate details and timeless designs. From delicate bands to statement pieces.',
    },
    {
      icon: Heart,
      title: 'Pendants & Necklaces',
      description: 'Elegant pendants and chains that showcase the beauty of oxidized silver craftsmanship. Perfect for layering or wearing solo.',
    },
    {
      icon: Crown,
      title: 'Earrings',
      description: 'From subtle studs to elegant drops, our earring collection combines comfort with distinctive style.',
    },
    {
      icon: Gift,
      title: 'Bracelets',
      description: 'Oxidized silver bracelets that blend elegance with durability. Each piece develops character over time.',
    },
  ];

  return (
    <div className="container max-w-5xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Collections</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our handcrafted oxidized sterling silver jewelry. Each piece features the signature darkened finish that highlights intricate details and gives a timeless, vintage character.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.title}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-2xl">{category.title}</CardTitle>
                </div>
                <CardDescription className="text-base">{category.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h2 className="font-serif text-2xl font-semibold mb-4">About Our Oxidized Silver</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              All our jewelry is crafted from genuine sterling silver (92.5% pure silver). The oxidized finish is an intentional, professional treatment that creates the signature darkened patina, giving each piece its distinctive vintage aesthetic.
            </p>
            <p>
              This finish is not a coating that wears off—it's a chemical process that darkens the silver, highlighting the intricate details and depth of each design. Over time, the oxidized areas may naturally polish with wear, creating a beautiful contrast between dark and bright silver.
            </p>
            <p>
              Browse our shop to see all available designs. Each piece is unique and crafted with attention to detail.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/shop">Browse All Jewelry</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
