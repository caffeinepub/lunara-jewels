import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Our Story</h1>
          <p className="text-xl text-muted-foreground">
            Timeless silver for modern souls
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Lunara Jewels was born from a passion for preserving ancient silversmithing traditions while creating pieces that resonate with contemporary aesthetics. Our name, inspired by the moon's ethereal glow, reflects the luminous beauty of oxidized silver—a material that captures light and shadow in perfect harmony.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            Each piece in our collection is handcrafted by skilled artisans who have mastered the delicate art of oxidation. This traditional technique creates the distinctive dark patina that makes our jewelry unique, with every piece developing its own character over time.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <Card className="border-none shadow-elegant">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                <Sparkles className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Craftsmanship</h3>
              <p className="text-muted-foreground">
                Every piece is meticulously handcrafted, ensuring exceptional quality and unique character.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Community</h3>
              <p className="text-muted-foreground">
                We work with local artisans, supporting traditional crafts and sustainable practices.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-elegant">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                <Award className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Authenticity</h3>
              <p className="text-muted-foreground">
                We use only genuine sterling silver, ensuring lasting beauty and value.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Philosophy Section */}
        <div className="bg-muted/30 rounded-lg p-8 md:p-12 space-y-6">
          <h2 className="font-display text-3xl font-bold text-center">Our Philosophy</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            We believe that jewelry should be more than adornment—it should be a reflection of your journey, your values, and your unique story. Our oxidized silver pieces are designed to age gracefully with you, developing a deeper patina and character over time, just like the memories they help you create.
          </p>
        </div>
      </div>
    </div>
  );
}

