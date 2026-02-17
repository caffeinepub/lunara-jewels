import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Mail, MessageCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function OrderTrackingPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Track Your Order</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated on your jewelry&apos;s journey from our workshop to your doorstep.
        </p>
      </div>

      <Alert className="mb-8">
        <Package className="h-4 w-4" />
        <AlertTitle>How Order Tracking Works</AlertTitle>
        <AlertDescription>
          Once your order ships, we&apos;ll send you tracking information via email. For order status inquiries before shipping, please contact us with your Order Reference number.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Package className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Your Order Reference</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              When you submit an order request, you&apos;ll receive an <strong>Order Reference number</strong>. This unique identifier helps us quickly locate your order and provide updates.
            </p>
            <p>
              Keep this Order Reference handy! You&apos;ll need it when:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Checking on your order status</li>
              <li>Asking questions about your order</li>
              <li>Requesting changes or updates</li>
              <li>Initiating returns or exchanges</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Tracking Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Once your order is confirmed, crafted, and ready to ship, we&apos;ll send you:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Shipping confirmation email</li>
              <li>Tracking number for your package</li>
              <li>Estimated delivery date</li>
              <li>Link to track your package online</li>
            </ul>
            <p className="mt-4">
              You&apos;ll be able to monitor your package&apos;s journey in real-time and know exactly when to expect delivery.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Need an Update?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              If you have questions about your order status or haven&apos;t received tracking information, we&apos;re here to help!
            </p>
            <p className="font-medium text-foreground">To request an order update:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Have your Order Reference number ready</li>
              <li>Contact us via email, contact form, or chat</li>
              <li>Provide your Order Reference and any specific questions</li>
              <li>We&apos;ll respond promptly with your order status</li>
            </ol>
            <p className="mt-4">
              Our team monitors all orders and will keep you informed throughout the process. Don&apos;t hesitate to reach out if you need an update!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Order Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Here&apos;s what to expect after submitting your order request:</p>
            <div className="space-y-3 mt-4">
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  1
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Request Submitted</p>
                  <p className="text-sm">You receive an Order Reference number</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  2
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Confirmation</p>
                  <p className="text-sm">We contact you to confirm details and arrange payment (1-2 days)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  3
                </div>
                <div>
                  <p className="font-medium text-foreground">Crafting & Preparation</p>
                  <p className="text-sm">Your jewelry is prepared and packaged (ready-made items ship within 2-3 days; custom pieces take 2-4 weeks)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  4
                </div>
                <div>
                  <p className="font-medium text-foreground">Shipped</p>
                  <p className="text-sm">You receive tracking information via email</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  5
                </div>
                <div>
                  <p className="font-medium text-foreground">Delivered</p>
                  <p className="text-sm">Your jewelry arrives (5-10 business days from shipping)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/contact">Contact Us for Order Status</Link>
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
