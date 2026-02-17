import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Pencil, Clock, MessageCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CustomizationPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Customization & Personalization</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create something uniquely yours. We love bringing your jewelry visions to life through custom design and personalization.
        </p>
      </div>

      <Alert className="mb-8">
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          All custom work is discussed and confirmed through direct contact with our team. Feasibility, timelines, and pricing are determined based on your specific request.
        </AlertDescription>
      </Alert>

      <div className="space-y-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Pencil className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Custom Design Requests</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We're open to custom design requests! Whether you have a specific vision, inspiration images, or sketches, we'd love to discuss bringing your ideas to life in oxidized sterling silver.
            </p>
            <p>
              Custom pieces allow you to create jewelry that's truly one-of-a-kind. From modifying existing designs to creating entirely new pieces, we'll work with you to craft something special.
            </p>
            <p className="font-medium text-foreground">
              To start a custom design project, please contact us with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your design ideas or inspiration</li>
              <li>Reference images or sketches (if available)</li>
              <li>Preferred jewelry type (ring, pendant, bracelet, etc.)</li>
              <li>Any specific size or dimension requirements</li>
              <li>Your timeline and budget considerations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Engraving & Personalization</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Add a personal touch with engraving! We can discuss engraving options for names, dates, initials, or short messages on your jewelry.
            </p>
            <p>
              Engraving availability depends on the specific piece and the text you'd like to add. Contact us with details about what you'd like engraved and which piece you're interested in, and we'll let you know what's possible along with timing and pricing.
            </p>
            <p className="text-sm italic">
              Note: Engraved items may have different return/exchange policies due to their personalized nature.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">Custom Work Timeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Custom work timelines vary depending on the complexity of the design and current workload. Typically, custom pieces take 2-4 weeks from design approval to completion.
            </p>
            <p>
              The process includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Initial consultation and design discussion</li>
              <li>Design sketch or mockup for your approval</li>
              <li>Crafting your piece with attention to detail</li>
              <li>Quality check and finishing</li>
              <li>Careful packaging and shipping</li>
            </ul>
            <p>
              Contact us with your specific request, and we'll provide a more accurate timeline based on your project!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <CardTitle className="font-serif text-2xl">How to Get Started</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Ready to create something special? The best way to start is by reaching out to us directly. We'll discuss your ideas, provide guidance on what's possible, and work together to create a piece you'll treasure.
            </p>
            <p>
              You can contact us through our contact form, chat with us, or include your customization request when submitting an order inquiry.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild size="lg">
          <Link to="/contact">Contact Us About Custom Work</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/chat">Chat with Us</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/shop">Browse Current Collection</Link>
        </Button>
      </div>
    </div>
  );
}
