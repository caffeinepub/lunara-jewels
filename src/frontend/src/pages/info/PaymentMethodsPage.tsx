import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Copy,
  QrCode,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const UPI_ID = "jewelerslunara312@gmail.com";

export default function PaymentMethodsPage() {
  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      toast.success("UPI ID copied to clipboard!");
    } catch {
      toast.error("Failed to copy. Please copy manually.");
    }
  };

  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Payment Methods
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pay instantly and securely via UPI — the easiest way to complete your
          Lunara Jewels purchase.
        </p>
      </div>

      <Alert className="mb-8 border-primary/20 bg-primary/5">
        <Smartphone className="h-4 w-4 text-primary" />
        <AlertTitle className="text-primary">UPI Payment Available</AlertTitle>
        <AlertDescription>
          Pay directly via UPI during checkout. Scan the QR code or use our UPI
          ID with any UPI app — PhonePe, Google Pay, Paytm, BHIM, and more.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 mb-12">
        {/* Primary UPI Card */}
        <Card className="border-primary/20 shadow-elegant">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <QrCode className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="font-display text-2xl">
                Pay via UPI
              </CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Scan the QR code with any UPI app (PhonePe, Google Pay, Paytm,
              BHIM, etc.)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Code */}
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-2xl overflow-hidden border border-border bg-white p-3 shadow-sm">
                <img
                  src="/assets/generated/upi-qr-code-transparent.dim_400x450.png"
                  alt="UPI QR Code — jewelerslunara312@gmail.com"
                  className="w-[200px] h-auto"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Point your phone camera at the QR code to pay
              </p>
            </div>

            <Separator />

            {/* UPI ID */}
            <div className="space-y-2">
              <p className="text-sm font-medium">UPI ID</p>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 border border-border">
                <span className="flex-1 font-mono text-sm font-semibold tracking-wide text-foreground select-all">
                  {UPI_ID}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyUPI}
                  className="shrink-0 gap-1.5 text-primary hover:text-primary"
                  data-ocid="payment_methods.upi_copy_button"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium">How to pay:</p>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Open PhonePe, Google Pay, Paytm, or any UPI app on your phone
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Scan the QR code above, or search UPI ID manually
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Enter the exact amount and complete the payment
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  Copy the UTR / transaction ID shown after payment
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                    5
                  </span>
                  Paste it in the checkout form to confirm your order
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="font-display text-2xl">
                Payment Security
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              UPI payments are processed through India's secure National
              Payments Corporation of India (NPCI) infrastructure. Your
              transaction is protected end-to-end.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All transactions are encrypted and bank-verified</li>
              <li>We never ask for your UPI PIN or card details</li>
              <li>You receive an instant bank confirmation SMS</li>
              <li>Your UTR number serves as proof of payment</li>
            </ul>
            <p className="mt-4">
              If you have any concerns, please contact us before making a
              payment. We're happy to answer questions and ensure you feel
              comfortable.
            </p>
          </CardContent>
        </Card>

        {/* Flexible Plans Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-6 w-6 text-primary" />
              <CardTitle className="font-display text-2xl">
                Flexible Payment Plans
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              For larger orders or special requirements, we offer flexible
              payment arrangements in addition to UPI:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Installment plans (EMI options via UPI or bank transfer)</li>
              <li>Partial payment upfront with balance on delivery</li>
              <li>Bank transfers (NEFT/RTGS/IMPS) for bulk orders</li>
              <li>Custom payment schedules — contact us to discuss</li>
            </ul>
            <p className="mt-4">
              Payment for all standard orders is now done via UPI directly
              during checkout — fast, simple, and instant.
            </p>
          </CardContent>
        </Card>

        {/* Confirmation Card */}
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-display text-2xl">
                Order Confirmation
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>After your UPI payment is complete:</p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">
                  Enter your UTR number
                </strong>{" "}
                in the checkout form to confirm your payment
              </li>
              <li>
                <strong className="text-foreground">
                  Receive your order confirmation
                </strong>{" "}
                with both order reference and payment reference
              </li>
              <li>
                <strong className="text-foreground">
                  Your jewelry is crafted and shipped
                </strong>{" "}
                within 3–5 business days
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/order-request">Start Order & Pay via UPI</Link>
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
