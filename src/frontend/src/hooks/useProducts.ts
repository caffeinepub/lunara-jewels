import { useQuery } from "@tanstack/react-query";
import type { Product } from "../backend";
import { sampleProducts } from "../data/sampleProducts";
import { useActor } from "./useActor";

// Map product IDs to their specific images (real photos for 1-8, generated for 9-20)
const productImageMap: Record<number, string> = {
  1: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.58-AM-2--1.jpeg",
  2: "/assets/uploads/WhatsApp-Image-2026-03-03-at-12.02.06-PM-2.jpeg",
  3: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.58-AM-3.jpeg",
  4: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.57-AM-1--4.jpeg",
  5: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.58-AM-1--5.jpeg",
  6: "/assets/uploads/WhatsApp-Image-2026-03-03-at-10.48.57-AM-6.jpeg",
  7: "/assets/uploads/WhatsApp-Image-2026-03-03-at-12.03.30-PM-7.jpeg",
  8: "/assets/uploads/WhatsApp-Image-2026-03-03-at-12.03.39-PM-8.jpeg",
  9: "/assets/generated/lunara-product-eternal-bracelet.dim_1024x1024.png",
  10: "/assets/generated/lunara-product-starry-studs.dim_1024x1024.png",
  11: "/assets/generated/lunara-product-dual-orbit-necklace.dim_1024x1024.png",
  12: "/assets/generated/lunara-product-midnight-choker.dim_1024x1024.png",
  13: "/assets/generated/lunara-product-mooncharm-chain.dim_1024x1024.png",
  14: "/assets/generated/lunara-product-charm-anklet.dim_1024x1024.png",
  15: "/assets/generated/lunara-product-floral-nose-ring.dim_1024x1024.png",
  16: "/assets/generated/lunara-product-leaf-hairpin.dim_1024x1024.png",
  17: "/assets/generated/lunara-product-constellation-brooch.dim_1024x1024.png",
  18: "/assets/generated/lunara-product-shadowband-ring.dim_1024x1024.png",
  19: "/assets/generated/lunara-product-moonlit-ring.dim_1024x1024.png",
  20: "/assets/generated/lunara-product-celestial-pendant.dim_1024x1024.png",
};

// Normalize product image URLs to use mapped assets when backend has legacy paths
function normalizeProductImage(product: Product): Product {
  const productId = Number(product.id);

  // If the product has a legacy /images/*.jpg path or missing imageUrl, use the mapped image
  if (
    !product.imageUrl ||
    product.imageUrl.startsWith("/images/") ||
    product.imageUrl.includes("image1.jpg")
  ) {
    const mappedImage = productImageMap[productId];
    if (mappedImage) {
      return { ...product, imageUrl: mappedImage };
    }
  }

  // Keep backend-provided /assets/* paths unchanged
  return product;
}

export function useProducts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      // If actor is still loading, return sample products immediately
      if (!actor || actorFetching) {
        return sampleProducts;
      }

      try {
        const products = await actor.listProducts();

        // If backend returns no products, use sample products
        if (!products || products.length === 0) {
          return sampleProducts;
        }

        // Normalize image URLs for products with legacy paths
        const normalizedProducts = products.map(normalizeProductImage);

        // If backend returns fewer than 20 products, fill up to 20 with sample products
        if (normalizedProducts.length < 20) {
          const existingIds = new Set(
            normalizedProducts.map((p) => Number(p.id)),
          );
          const fillProducts = sampleProducts.filter(
            (p) => !existingIds.has(Number(p.id)),
          );
          const needed = 20 - normalizedProducts.length;
          return [...normalizedProducts, ...fillProducts.slice(0, needed)];
        }

        // Return all products from backend (20 or more)
        return normalizedProducts;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        return sampleProducts;
      }
    },
    // Always enable the query so it runs immediately
    enabled: true,
    // Use stale time to avoid refetching too often
    staleTime: 30000,
  });
}

export function useProduct(id: number) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!actor || actorFetching) {
        return sampleProducts.find((p) => Number(p.id) === id) || null;
      }

      try {
        const product = await actor.getProduct(BigInt(id));
        // Normalize image URL for product with legacy path
        return normalizeProductImage(product);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        return sampleProducts.find((p) => Number(p.id) === id) || null;
      }
    },
    enabled: true,
    staleTime: 30000,
  });
}
