import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product } from '../backend';
import { sampleProducts } from '../data/sampleProducts';

export function useProducts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return sampleProducts;
      
      try {
        const products = await actor.listProducts();
        // Only use sample products if actor is not available
        // If backend returns empty array, show empty (admin can add products)
        return products;
      } catch (error) {
        console.error('Failed to fetch products:', error);
        return sampleProducts;
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useProduct(id: number) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!actor) {
        return sampleProducts.find((p) => Number(p.id) === id) || null;
      }
      
      try {
        const product = await actor.getProduct(BigInt(id));
        return product;
      } catch (error) {
        console.error('Failed to fetch product:', error);
        return sampleProducts.find((p) => Number(p.id) === id) || null;
      }
    },
    enabled: !!actor && !actorFetching,
  });
}
