import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { useAdminStatus } from '../hooks/useAdminStatus';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(window.location.hostname || 'lunara-jewels');
  const { isAdmin, isAuthenticated } = useAdminStatus();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/assets/generated/lunara-jewels-logo.dim_1200x300.png"
              alt="Lunara Jewels"
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground max-w-xs">
              Timeless silver for modern souls. Handcrafted oxidized silver jewelry that tells your story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/chat" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Chat
              </Link>
              <Link to="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Collections
              </Link>
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Jewelry Journal
              </Link>
              {isAuthenticated && isAdmin && (
                <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin Dashboard
                </Link>
              )}
            </nav>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Help & Support</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping & Delivery
              </Link>
              <Link to="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Returns & Exchange
              </Link>
              <Link to="/payment-methods" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Payment Methods
              </Link>
              <Link to="/order-tracking" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Track Order
              </Link>
              <Link to="/customization" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Customization
              </Link>
            </nav>
          </div>

          {/* Policies & Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Policies & Info</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/certifications-quality" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Quality & Craftsmanship
              </Link>
              <Link to="/reviews" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Customer Reviews
              </Link>
              <Link to="/pricing-offers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing & Offers
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Lunara Jewels. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
