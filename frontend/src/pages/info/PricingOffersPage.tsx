import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, DollarSign, Sparkles, MessageCircle } from 'lucide-react';

export default function PricingOffersPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Pricing & Offers</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transparent pricing for handcrafted quality. Each piece is individually priced based on design complexity and materials.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">How We Price Our Jewelry</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Each piece in our collection is individually priced based on the design complexity, materials used, and craftsmanship involved. You'll find the price clearly listed on each product page in our shop.
            </p>
            <p>
              Our prices include all crafting and materials costs—there are no separate making charges or hidden fees. The price you see is the complete price for that piece.
            </p>
            <p>
              We believe in fair, transparent pricing for handcrafted quality that lasts. Every piece is made from genuine sterling silver (92.5% pure silver) with professional oxidized finishing.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Tag className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Special Offers & Promotions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We occasionally offer special promotions during festivals, holidays, and special occasions. The best way to stay updated is to check our shop regularly or contact us to join our mailing list.
            </p>
            <p>
              Any active discounts or offers will be clearly displayed on our shop page and applied when you submit your order request.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Taxes & Final Pricing</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Pricing and applicable tax details are confirmed when you place your order request. Taxes will be clearly communicated based on your location before final confirmation.
            </p>
            <p>
              After you submit an order request, our team will contact you to confirm all details including the final total, any applicable taxes, and shipping costs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Payment Options</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Payment options including installments or flexible payment plans can be discussed when we confirm your order. We work with each customer individually to arrange payment that works for you.
            </p>
            <p>
              Please submit an order request or contact us to discuss payment arrangements that suit your preferences.
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
