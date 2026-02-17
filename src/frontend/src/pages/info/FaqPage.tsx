import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle } from 'lucide-react';

export default function FaqPage() {
  const faqCategories = [
    {
      category: 'Products & Materials',
      questions: [
        {
          q: 'What is oxidized silver jewelry?',
          a: 'Oxidized silver jewelry is sterling silver (92.5% pure silver) that has been intentionally darkened through a chemical process. This creates a vintage, antique appearance that highlights intricate details and gives each piece unique character.',
        },
        {
          q: 'Is the oxidized finish permanent?',
          a: 'The oxidized finish is part of the silver itself, not a coating. While it\'s permanent, it may naturally polish with wear over time, creating a beautiful contrast between dark and bright silver. You can maintain or restore the finish with proper care.',
        },
        {
          q: 'What types of jewelry do you offer?',
          a: 'We specialize in handcrafted oxidized silver jewelry including rings, pendants, necklaces, bracelets, and earrings. Each piece features the signature darkened finish and intricate craftsmanship.',
        },
        {
          q: 'Is your jewelry hypoallergenic?',
          a: 'Sterling silver is generally hypoallergenic and suitable for most people with sensitive skin. However, if you have severe metal allergies, please contact us to discuss specific pieces and materials.',
        },
      ],
    },
    {
      category: 'Ordering & Pricing',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Browse our shop, add items to your cart, and submit an order request. Our team will contact you to confirm details, discuss payment, and arrange delivery. We use an inquiry-based system to provide personalized service.',
        },
        {
          q: 'How is pricing determined?',
          a: 'Each piece is individually priced based on design complexity and materials. Prices include all crafting and materials costs—no separate making charges. You\'ll see the complete price on each product page.',
        },
        {
          q: 'Do you offer discounts or promotions?',
          a: 'We occasionally offer special promotions during festivals and holidays. Check our shop regularly or contact us to join our mailing list for updates on sales and offers.',
        },
        {
          q: 'Can I get a custom piece made?',
          a: 'Yes! We love creating custom pieces. Contact us with your ideas, and we\'ll discuss feasibility, timeline (typically 2-4 weeks), and pricing to bring your vision to life.',
        },
      ],
    },
    {
      category: 'Sizing & Fit',
      questions: [
        {
          q: 'How do I know my ring size?',
          a: 'Measure your finger circumference or use a ring sizer. If you need help with sizing, contact us—we\'re happy to assist! We can provide guidance on measuring and selecting the right size.',
        },
        {
          q: 'What if the jewelry doesn\'t fit?',
          a: 'Contact us within 14 days of receiving your order. We can arrange an exchange for a different size if available. Items must be unworn and in original condition for exchanges.',
        },
        {
          q: 'Do you offer adjustable pieces?',
          a: 'Some of our designs feature adjustable elements. Check individual product descriptions or contact us to ask about specific pieces.',
        },
      ],
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          q: 'How long does delivery take?',
          a: 'Typical delivery is 5-10 business days depending on your location. For custom pieces, allow additional time for crafting (2-4 weeks) before shipping begins.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'We ship to many locations! Contact us with your specific location for shipping options, timelines, and costs.',
        },
        {
          q: 'How much does shipping cost?',
          a: 'Shipping costs vary based on your location and order size. We\'ll provide exact costs when you submit your order request, before final confirmation.',
        },
        {
          q: 'Will I receive tracking information?',
          a: 'Yes! Once your order ships, we\'ll send you tracking information via email so you can monitor your package\'s journey.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'Contact us within 14 days of receiving your order if you\'re not satisfied. Items must be unworn and in original condition. We\'ll work with you on returns or refunds.',
        },
        {
          q: 'Can I exchange my jewelry?',
          a: 'Yes! Exchanges are possible within 14 days. Contact us to arrange an exchange for a different size or design. Items must be unworn and in original condition.',
        },
        {
          q: 'What if I receive a damaged item?',
          a: 'Contact us immediately with photos. We\'ll make it right with a replacement or refund. Damaged items can be returned at any time, even beyond the 14-day window.',
        },
      ],
    },
    {
      category: 'Payment',
      questions: [
        {
          q: 'How do I pay for my order?',
          a: 'After you submit an order request, we\'ll contact you to confirm details and discuss payment options. We work with each customer individually to arrange secure payment through bank transfers, UPI, or other methods.',
        },
        {
          q: 'Is payment secure?',
          a: 'Yes! We use trusted payment systems and never collect sensitive payment information through this website. Payment is arranged through secure channels after order confirmation.',
        },
        {
          q: 'Do you offer installment plans?',
          a: 'For larger orders, we can discuss flexible payment arrangements including installments. Mention your preferences when submitting your order request.',
        },
      ],
    },
    {
      category: 'Care & Maintenance',
      questions: [
        {
          q: 'How do I care for oxidized silver jewelry?',
          a: 'Store in a cool, dry place away from moisture. Clean gently with a soft cloth. Avoid harsh chemicals and abrasive cleaners. The oxidized finish may naturally polish with wear, which adds character.',
        },
        {
          q: 'Can I restore the oxidized finish?',
          a: 'Yes! If the oxidized finish lightens over time, you can restore it using oxidizing solutions available at jewelry supply stores, or contact us for restoration services.',
        },
        {
          q: 'Is oxidized silver jewelry durable?',
          a: 'Yes! Sterling silver is durable and suitable for daily wear. The oxidized finish is permanent and part of the silver itself. With proper care, your jewelry will last for years.',
        },
      ],
    },
  ];

  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our oxidized silver jewelry, ordering process, and policies.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="font-serif text-2xl font-semibold mb-4">{category.category}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.questions.map((item, itemIndex) => (
                <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-semibold mb-3">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Can't find the answer you're looking for? Our team is here to help! Reach out through our contact form or chat with us directly.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/chat">Chat with Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
