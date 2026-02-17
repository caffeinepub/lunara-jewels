import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Gift, Droplets } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      icon: Droplets,
      title: 'Caring for Your Oxidized Silver Jewelry',
      description: 'Learn how to maintain the beauty and character of your oxidized silver pieces with proper care and storage.',
      content: [
        'Oxidized silver jewelry is durable and designed for everyday wear, but proper care will keep it looking beautiful for years.',
        'Store your jewelry in a cool, dry place away from moisture. A jewelry box or soft pouch works perfectly.',
        'Clean gently with a soft, dry cloth. Avoid harsh chemicals, abrasive cleaners, or ultrasonic cleaners that might damage the oxidized finish.',
        'The oxidized finish may naturally polish with regular wear, creating a beautiful contrast between dark and bright silver. This is normal and adds character!',
        'If you want to restore the darker finish, you can use oxidizing solutions available at jewelry supply stores, or contact us for restoration services.',
        'Remove jewelry before swimming, bathing, or exercising to prevent exposure to chemicals and excessive moisture.',
      ],
    },
    {
      icon: Sparkles,
      title: 'Styling Oxidized Silver: Tips & Ideas',
      description: 'Discover how to incorporate oxidized silver jewelry into your everyday style and special occasion looks.',
      content: [
        'Oxidized silver\'s vintage aesthetic pairs beautifully with both casual and formal attire. The darkened finish adds depth and character to any outfit.',
        'For everyday wear, try simple oxidized silver studs or a delicate pendant. These pieces add subtle elegance without overwhelming your look.',
        'Layer multiple oxidized silver necklaces of different lengths for a bohemian, artistic vibe. Mix textures and pendant styles for visual interest.',
        'Oxidized silver complements earth tones, blacks, and whites particularly well. The contrast creates a striking, sophisticated appearance.',
        'Don\'t be afraid to mix oxidized silver with bright silver pieces! The contrast between dark and bright metals creates a modern, eclectic style.',
        'For special occasions, statement oxidized silver pieces like bold rings or drop earrings can be the perfect finishing touch to your ensemble.',
      ],
    },
    {
      icon: Gift,
      title: 'Gifting Oxidized Silver Jewelry',
      description: 'Why oxidized silver makes a thoughtful, unique gift for any occasion.',
      content: [
        'Oxidized silver jewelry makes a meaningful gift because each piece is unique and handcrafted with care. It\'s a gift that shows thoughtfulness.',
        'The vintage aesthetic appeals to people who appreciate artisan craftsmanship and timeless design. It\'s perfect for those with bohemian or eclectic style.',
        'Consider the recipient\'s style: delicate pieces for minimalists, bold statement jewelry for those who love to stand out.',
        'Oxidized silver is suitable for all ages and genders. From teenagers to grandparents, there\'s a piece for everyone.',
        'For special occasions like birthdays, anniversaries, or graduations, consider custom or personalized pieces with engraving.',
        'All our jewelry comes beautifully packaged, ready to gift. We can also include a personal note if you\'d like!',
      ],
    },
    {
      icon: Heart,
      title: 'The Story Behind Oxidized Silver',
      description: 'Understanding the art and technique of oxidized silver jewelry making.',
      content: [
        'Oxidized silver, also called blackened or antiqued silver, has been used in jewelry making for centuries. The technique highlights intricate details and gives pieces a vintage character.',
        'The oxidation process involves treating sterling silver with a chemical solution that darkens the metal. This isn\'t a coating—it\'s a permanent change to the silver itself.',
        'Artisans use oxidation to create depth and contrast in their designs. The darkened areas make raised details stand out, adding visual interest and dimension.',
        'Each piece develops its own unique patina over time. As you wear your jewelry, high points may naturally polish while recessed areas stay dark, creating beautiful contrast.',
        'At Lunara Jewels, we use traditional oxidation techniques combined with modern craftsmanship to create pieces that honor the past while feeling contemporary.',
        'The beauty of oxidized silver is that it tells a story—both the story of its creation and the story of your life as you wear it.',
      ],
    },
  ];

  return (
    <div className="container max-w-5xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Jewelry Journal</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the world of oxidized silver jewelry with care tips, styling ideas, and insights into our craft.
        </p>
      </div>

      <div className="space-y-8 mb-12">
        {posts.map((post, index) => {
          const Icon = post.icon;
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-2xl">{post.title}</CardTitle>
                    <CardDescription className="mt-1">{post.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-muted-foreground">
                  {post.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold mb-3">Ready to Explore Our Collection?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Discover handcrafted oxidized silver jewelry that combines timeless beauty with modern style.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/shop">Browse Jewelry</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
