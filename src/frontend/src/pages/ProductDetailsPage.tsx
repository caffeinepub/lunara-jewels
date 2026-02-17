import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProduct } from '../hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../state/cart';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ProductDetailsPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(Number(productId));
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      productId: Number(product.id),
      name: product.name,
      price: Number(product.price),
      quantity,
      imageUrl: product.imageUrl,
    });
    
    toast.success('Added to cart', {
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <p className="text-lg text-muted-foreground mb-4">Product not found</p>
        <Button onClick={() => navigate({ to: '/shop' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/shop' })}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-semibold">₹{Number(product.price).toLocaleString()}</p>
          </div>

          <Separator />

          <div>
            <h2 className="font-serif text-xl font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Handcrafted oxidized silver</li>
                <li>• Authentic sterling silver material</li>
                <li>• Unique patina finish</li>
                <li>• Made with traditional techniques</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  -
                </Button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x bg-transparent py-2 focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3"
                >
                  +
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

