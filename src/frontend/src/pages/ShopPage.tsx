import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProducts } from '../hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../state/cart';
import { toast } from 'sonner';

export default function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const addItem = useCartStore((state) => state.addItem);

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

  // Always show products or loading state - never empty
  const displayProducts = products || [];

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold">Our Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover our handcrafted oxidized silver jewelry. Each piece tells a story of timeless elegance and modern craftsmanship.
        </p>
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => (
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
      )}
    </div>
  );
}
