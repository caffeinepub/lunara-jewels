import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertCircle, CheckCircle, MessageCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ReturnsExchangePage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Returns & Exchange Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We want you to love your jewelry! If you're not completely satisfied, we're here to help.
        </p>
      </div>

      <Alert className="mb-8">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Your Satisfaction Matters</AlertTitle>
        <AlertDescription>
          All returns and exchanges are handled through direct contact with our team. We'll guide you through the process and make it as smooth as possible.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <RotateCcw className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Return Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              If you're not completely satisfied with your purchase, please contact us within <strong>14 days</strong> of receiving your order. We'll work with you on returns or refunds.
            </p>
            <p className="font-medium text-foreground">Return Requirements:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Items must be unworn and in original condition</li>
              <li>Original packaging should be included when possible</li>
              <li>Contact us within 14 days of receiving your order</li>
              <li>Provide your order reference number</li>
            </ul>
            <p className="text-sm italic">
              Note: Custom or personalized items may have different return policies due to their unique nature. We'll discuss this when you place a custom order.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <RotateCcw className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Exchange Policy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Exchanges are possible within <strong>14 days</strong> of receiving your order. Items must be unworn and in original condition.
            </p>
            <p>
              Contact us to arrange an exchange, and we'll guide you through the process. You can exchange for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A different size (if available)</li>
              <li>A different design of equal or greater value</li>
              <li>Store credit toward a future purchase</li>
            </ul>
            <p>
              If there's a price difference, we'll work with you to arrange payment or refund of the difference.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Damaged or Defective Items</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We're so sorry if you received a damaged or defective item! Please contact us immediately with photos of the issue.
            </p>
            <p>
              We'll make it right by either:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Sending a replacement piece at no cost</li>
              <li>Issuing a full refund</li>
              <li>Offering store credit for a future purchase</li>
            </ul>
            <p>
              Your satisfaction is our priority, and we stand behind the quality of our jewelry. Damaged or defective items can be returned at any time, even beyond the 14-day window.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">How to Initiate a Return or Exchange</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p className="font-medium text-foreground">To start a return or exchange:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Contact us via email, contact form, or chat</li>
              <li>Provide your order reference number</li>
              <li>Explain the reason for return/exchange</li>
              <li>Include photos if the item is damaged or defective</li>
            </ol>
            <p className="mt-4">
              Our team will respond promptly with instructions for returning the item and information about refunds, exchanges, or replacements.
            </p>
            <p>
              Return shipping costs are typically the customer's responsibility unless the item is damaged, defective, or we made an error with your order.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Refund Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Once we receive your returned item and verify its condition, we'll process your refund within 5-7 business days.
            </p>
            <p>
              Refunds will be issued to your original payment method. Depending on your bank or payment provider, it may take additional time for the refund to appear in your account.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/contact">Contact Us About a Return</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/chat">Chat with Us</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
