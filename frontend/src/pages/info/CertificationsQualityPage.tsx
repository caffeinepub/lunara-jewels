import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Shield, Sparkles, Heart } from 'lucide-react';

export default function CertificationsQualityPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Quality & Craftsmanship</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every piece of Lunara Jewels jewelry is crafted with care, using genuine materials and traditional techniques.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Genuine Sterling Silver</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              All our jewelry is crafted from genuine sterling silver, which contains 92.5% pure silver. This is the international standard for quality silver jewelry and ensures durability while maintaining the beauty of pure silver.
            </p>
            <p>
              Sterling silver is marked as "925" in many regions, indicating its 92.5% silver content. We use only authentic sterling silver in all our pieces—never plated or filled alternatives.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">The Oxidized Finish</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              The oxidized finish is an intentional, professional treatment that creates the signature darkened patina on our jewelry. This is not a coating that wears off—it's a chemical process that darkens the silver itself.
            </p>
            <p>
              This finish highlights the intricate details and depth of each design, giving our jewelry its distinctive vintage aesthetic. Over time, the oxidized areas may naturally polish with wear, creating a beautiful contrast between dark and bright silver.
            </p>
            <p>
              The oxidized finish is permanent and part of the silver itself, though you can maintain or restore it with proper care (see our care instructions).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Handcrafted with Care</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Each piece is handcrafted by skilled artisans who bring years of experience to their work. From initial design to final finishing, every step is performed with attention to detail and dedication to quality.
            </p>
            <p>
              We inspect each piece before it leaves our workshop to ensure it meets our standards for craftsmanship, finish quality, and structural integrity.
            </p>
            <p>
              Because each piece is handmade, slight variations in oxidation patterns and finish are natural and add to the unique character of your jewelry.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Quality Assurance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We stand behind the quality of our jewelry. Each piece undergoes quality checks to ensure:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Genuine sterling silver materials</li>
              <li>Proper oxidized finish application</li>
              <li>Secure clasps, settings, and connections</li>
              <li>Smooth edges and comfortable wear</li>
              <li>Consistent craftsmanship standards</li>
            </ul>
            <p className="mt-4">
              If you receive a piece that doesn't meet these standards or has any defects, please contact us immediately. We'll make it right with a replacement or refund.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">About Hallmarks & Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We use genuine sterling silver (92.5% pure silver) in all our jewelry. Hallmarking requirements and availability vary by region and piece size.
            </p>
            <p>
              For specific questions about hallmarks, certifications, or material verification for a particular piece, please contact us. We're happy to provide detailed information about any item in our collection.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/shop">Browse Our Collection</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
