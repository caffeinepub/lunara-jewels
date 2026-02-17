import { Link, useNavigate } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '../state/cart';
import { useState } from 'react';

export default function SiteHeader() {
  const navigate = useNavigate();
  const cartItemCount = useCartStore((state) => state.items.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/chat', label: 'Chat' },
  ];

  const helpLinks = [
    { to: '/faq', label: 'FAQ' },
    { to: '/shipping', label: 'Shipping & Delivery' },
    { to: '/returns', label: 'Returns & Exchange' },
    { to: '/payment-methods', label: 'Payment Methods' },
    { to: '/order-tracking', label: 'Track Order' },
  ];

  const learnLinks = [
    { to: '/collections', label: 'Our Collections' },
    { to: '/customization', label: 'Customization' },
    { to: '/certifications-quality', label: 'Quality & Craftsmanship' },
    { to: '/blog', label: 'Jewelry Journal' },
    { to: '/reviews', label: 'Customer Reviews' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/assets/generated/lunara-jewels-logo.dim_1200x300.png"
            alt="Lunara Jewels"
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors hover:text-accent-foreground"
              activeProps={{ className: 'text-foreground' }}
              inactiveProps={{ className: 'text-muted-foreground' }}
            >
              {link.label}
            </Link>
          ))}

          {/* Help Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-accent-foreground">
                Help <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {helpLinks.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  <Link to={link.to} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Learn Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-accent-foreground">
                Learn <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {learnLinks.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  <Link to={link.to} className="cursor-pointer">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Cart & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate({ to: '/cart' })}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col gap-6 mt-8">
                {mainNavLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="text-lg font-medium transition-colors hover:text-accent-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <div className="border-t border-border/40 pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Help & Support</p>
                  {helpLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <Link
                        to={link.to}
                        className="block py-2 text-sm transition-colors hover:text-accent-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="border-t border-border/40 pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Learn More</p>
                  {learnLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <Link
                        to={link.to}
                        className="block py-2 text-sm transition-colors hover:text-accent-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
