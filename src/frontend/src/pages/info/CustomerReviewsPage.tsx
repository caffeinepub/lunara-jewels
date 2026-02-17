import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Star, Quote } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CustomerReviewsPage() {
  const testimonials = [
    {
      name: 'Priya S.',
      location: 'Mumbai',
      rating: 5,
      text: 'Absolutely love my oxidized silver ring! The craftsmanship is exceptional and the vintage look is exactly what I was hoping for. It\'s become my everyday favorite.',
    },
    {
      name: 'Rahul M.',
      location: 'Bangalore',
      text: 'Bought a pendant for my wife and she was thrilled! The quality is outstanding and the oxidized finish gives it such character. Highly recommend Lunara Jewels.',
      rating: 5,
    },
    {
      name: 'Anjali K.',
      location: 'Delhi',
      rating: 5,
      text: 'The earrings I ordered are beautiful and comfortable to wear. The team was very helpful with sizing questions. Great experience from start to finish!',
    },
    {
      name: 'Vikram P.',
      location: 'Pune',
      rating: 5,
      text: 'Impressed by the quality and uniqueness of the designs. The oxidized silver has such a timeless appeal. Will definitely be ordering more pieces!',
    },
    {
      name: 'Meera R.',
      location: 'Chennai',
      rating: 5,
      text: 'Got a custom bracelet made and the team was wonderful to work with. They brought my vision to life perfectly. The craftsmanship is top-notch!',
    },
    {
      name: 'Arjun T.',
      location: 'Hyderabad',
      rating: 5,
      text: 'Beautiful jewelry at fair prices. The oxidized finish is authentic and well-done. Shipping was prompt and packaging was excellent. Very satisfied!',
    },
  ];

  return (
    <div className="container max-w-5xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hear from our customers about their experience with Lunara Jewels handcrafted oxidized silver jewelry.
        </p>
      </div>

      <Alert className="mb-8">
        <Quote className="h-4 w-4" />
        <AlertDescription>
          These testimonials represent the experiences shared by our customers. We&apos;re grateful for every piece of feedback and strive to provide exceptional quality and service to everyone.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Quote className="h-8 w-8 text-muted-foreground/20 mb-2" />
              <p className="text-muted-foreground italic">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-6 text-center">
          <h2 className="font-serif text-2xl font-semibold mb-4">Share Your Experience</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We&apos;d love to hear about your experience with Lunara Jewels! Your feedback helps us continue to improve and helps other customers make informed decisions.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">Browse Our Collection</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
