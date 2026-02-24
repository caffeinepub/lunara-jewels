import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, MessageCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PaymentMethodsPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Payment Methods</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Secure, flexible payment options arranged to suit your preferences.
        </p>
      </div>

      <Alert className="mb-8">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>How Payment Works</AlertTitle>
        <AlertDescription>
          We work with each customer individually to arrange payment after your order request is reviewed and confirmed. Payment is not collected through this website.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Our Inquiry-Based Process</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Lunara Jewels uses an inquiry-based ordering system to provide personalized service and flexible payment options:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">Submit an order request</strong> through our website with the items you're interested in
              </li>
              <li>
                <strong className="text-foreground">Our team reviews your request</strong> and contacts you to confirm details (items, quantities, shipping address)
              </li>
              <li>
                <strong className="text-foreground">We discuss payment options</strong> that work for you, including method and timing
              </li>
              <li>
                <strong className="text-foreground">Payment is arranged</strong> through secure methods outside this website
              </li>
              <li>
                <strong className="text-foreground">Your order is crafted and shipped</strong> once payment is confirmed
              </li>
            </ol>
            <p className="mt-4">
              This approach allows us to offer flexible payment arrangements and personalized service for each customer.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Available Payment Options</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We work with each customer to arrange payment methods that suit your preferences. Common options include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Bank transfers (NEFT/RTGS/IMPS)</li>
              <li>UPI payments</li>
              <li>Cash on delivery (where available)</li>
              <li>Installment plans (for larger orders)</li>
              <li>Other secure payment methods by arrangement</li>
            </ul>
            <p className="mt-4">
              When we contact you to confirm your order, we'll discuss which payment methods are available for your location and order, and arrange what works best for you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Payment Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Your security is important to us. We work with trusted payment systems and never collect sensitive payment information through this website.
            </p>
            <p>
              When payment is arranged:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We use secure, established payment channels</li>
              <li>Payment details are handled through trusted platforms</li>
              <li>We never ask for card details via email or unsecured channels</li>
              <li>You'll receive clear confirmation of payment receipt</li>
            </ul>
            <p className="mt-4">
              If you have any concerns about payment security, please don't hesitate to contact us. We're happy to answer questions and ensure you feel comfortable with the process.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Flexible Payment Plans</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              For larger orders or special circumstances, we're happy to discuss flexible payment arrangements including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Installment plans (EMI options)</li>
              <li>Partial payment upfront with balance on delivery</li>
              <li>Custom payment schedules for bulk orders</li>
            </ul>
            <p className="mt-4">
              Please mention your payment preferences when submitting your order request or contact us directly to discuss options.
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
