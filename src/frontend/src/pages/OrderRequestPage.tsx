import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '../state/cart';
import { useSubmitOrderRequest } from '../hooks/useOrderRequest';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function OrderRequestPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { mutate: submitOrder, isPending } = useSubmitOrderRequest();
  const [orderReference, setOrderReference] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    shippingNote: '',
  });

  if (items.length === 0 && !orderReference) {
    navigate({ to: '/cart' });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    submitOrder(
      {
        customerName: formData.name,
        customerEmail: formData.email,
        shippingNote: formData.shippingNote,
        items: items.map((item) => ({
          productId: BigInt(item.productId),
          quantity: BigInt(item.quantity),
        })),
        totalAmount: BigInt(getTotalPrice()),
      },
      {
        onSuccess: (orderId) => {
          setOrderReference(orderId.toString());
          clearCart();
          toast.success('Order request submitted successfully!');
        },
        onError: (error) => {
          toast.error('Failed to submit order request', {
            description: error.message,
          });
        },
      }
    );
  };

  if (orderReference) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
            <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
          </div>
          <h1 className="font-display text-4xl font-bold">Order Request Received!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your interest in our jewelry. We've received your order request.
          </p>
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Your Order Reference</p>
              <p className="text-2xl font-bold font-mono">#{orderReference}</p>
            </CardContent>
          </Card>
          <p className="text-muted-foreground">
            We'll contact you at <strong>{formData.email}</strong> within 24-48 hours to confirm your order and arrange payment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate({ to: '/shop' })}>
              Continue Shopping
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate({ to: '/' })}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Complete Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <Card className="lg:col-span-2 border-none shadow-elegant">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingNote">Shipping Address / Notes</Label>
                  <Textarea
                    id="shippingNote"
                    placeholder="Enter your shipping address and any special instructions..."
                    rows={4}
                    value={formData.shippingNote}
                    onChange={(e) => setFormData({ ...formData, shippingNote: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    We'll contact you to confirm shipping details and arrange payment.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                  {isPending ? 'Submitting...' : 'Submit Order Request'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 border-none shadow-elegant">
              <CardHeader>
                <CardTitle className="font-display text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="bg-accent/10 rounded-lg p-4 text-sm text-muted-foreground">
                  <p>
                    This is an order inquiry. We'll contact you to confirm details and arrange payment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

