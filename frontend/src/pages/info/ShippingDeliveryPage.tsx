import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Truck, MapPin, Clock, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ShippingDeliveryPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Shipping & Delivery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We carefully package and ship each piece to ensure it reaches you safely and beautifully presented.
        </p>
      </div>

      <Alert className="mb-8">
        <Package className="h-4 w-4" />
        <AlertDescription>
          Shipping details, timelines, and costs are confirmed when you place your order request. We'll provide all information before final confirmation.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Delivery Timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Typical delivery is 5-10 business days depending on your location. This timeline begins after your order is confirmed and payment is arranged.
            </p>
            <p>
              For custom or personalized pieces, please allow additional time for crafting (typically 2-4 weeks) before shipping begins.
            </p>
            <p>
              If you need your jewelry by a specific date or require expedited shipping, please contact us directly to discuss options. We'll do our best to accommodate your timeline!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Shipping Locations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We ship to many locations! Please contact us with your specific location for shipping options, timelines, and costs.
            </p>
            <p>
              Whether you're local or international, we'll make sure your jewelry reaches you safely. Shipping costs vary based on your location and order size.
            </p>
            <p>
              When you submit an order request, include your complete shipping address so we can provide accurate shipping information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Packaging & Presentation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Every piece is carefully packaged to ensure safe delivery and beautiful presentation. Your jewelry will arrive ready to wear or gift!
            </p>
            <p>
              We use secure packaging materials to protect your jewelry during transit, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Protective jewelry boxes or pouches</li>
              <li>Cushioned shipping materials</li>
              <li>Secure outer packaging</li>
              <li>Care instructions included</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Truck className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Tracking Your Order</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Once your order ships, we'll send you tracking information via email. You'll be able to monitor your package's journey and know exactly when to expect delivery.
            </p>
            <p>
              If you have questions about your order status at any time, please contact us. We're here to help and keep you informed!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Shipping Costs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Shipping costs vary based on your location and order size. We'll provide exact shipping costs when you submit your order request, before final confirmation.
            </p>
            <p>
              We pack everything securely to ensure safe delivery, and shipping costs reflect the care we take in getting your jewelry to you in perfect condition.
            </p>
            <p>
              For questions about shipping costs to your location, please contact us or include your address when submitting an order request.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/order-request">Submit Order Request</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/chat">Chat with Us</Link>
        </Button>
      </div>
    </div>
  );
}
