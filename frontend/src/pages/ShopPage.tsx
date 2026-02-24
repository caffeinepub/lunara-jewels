import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts } from '../hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '../state/cart';
import { toast } from 'sonner';

export default function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: any) => {
    addItem({
      productId: Number(product.id),
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const allProducts = products || [];

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProducts;

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Our Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover our handcrafted oxidized silver jewelry. Each piece tells a story of timeless elegance and modern craftsmanship.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search by name or description…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 border-border focus-visible:ring-ring"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <Search className="h-12 w-12 text-muted-foreground/40" />
          <h2 className="font-serif text-2xl font-semibold text-foreground">No products found</h2>
          <p className="text-muted-foreground max-w-sm">
            No products matched <span className="font-medium text-foreground">"{searchQuery}"</span>. Try a different keyword or{' '}
            <button
              onClick={() => setSearchQuery('')}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              browse our full collection
            </button>
            .
          </p>
        </div>
      ) : (
        <>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for{' '}
              <span className="font-medium text-foreground">"{searchQuery}"</span>
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={Number(product.id)} className="overflow-hidden hover:shadow-elegant transition-shadow group">
                <Link to="/product/$productId" params={{ productId: String(product.id) }}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">
                    <Link
                      to="/product/$productId"
                      params={{ productId: String(product.id) }}
                      className="hover:text-accent-foreground transition-colors"
                    >
                      {product.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">₹{Number(product.price).toLocaleString()}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
