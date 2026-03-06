import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sampleProducts } from "../data/sampleProducts";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../state/cart";

type GenderTab = "all" | "women" | "men";

export default function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<GenderTab>("all");

  const handleAddToCart = (product: any) => {
    addItem({
      productId: Number(product.id),
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      imageUrl: product.imageUrl,
    });
    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const allProducts = products || [];

  // Merge gender info from sampleProducts
  const productsWithGender = allProducts.map((p) => {
    const sample = sampleProducts.find((s) => s.id === p.id);
    return { ...p, gender: sample?.gender ?? "unisex" };
  });

  const tabFiltered =
    activeTab === "all"
      ? productsWithGender
      : productsWithGender.filter(
          (p) => p.gender === activeTab || p.gender === "unisex",
        );

  const filteredProducts = searchQuery.trim()
    ? tabFiltered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : tabFiltered;

  const tabs: { key: GenderTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "women", label: "Women" },
    { key: "men", label: "Men" },
  ];

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          Our Collection
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover our handcrafted oxidized silver jewelry. Each piece tells a
          story of timeless elegance and modern craftsmanship.
        </p>
      </div>

      {/* Gender Tabs */}
      <div className="flex gap-2 mb-8" data-ocid="shop.gender.tab">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            data-ocid={`shop.${tab.key}.tab`}
            className={[
              "px-6 py-2 rounded-full text-sm font-medium border transition-colors duration-200",
              activeTab === tab.key
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-border hover:border-foreground",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
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
          data-ocid="shop.search_input"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
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
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable id
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
        <div
          className="flex flex-col items-center justify-center py-24 text-center gap-4"
          data-ocid="shop.empty_state"
        >
          <Search className="h-12 w-12 text-muted-foreground/40" />
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            No products found
          </h2>
          <p className="text-muted-foreground max-w-sm">
            {searchQuery ? (
              <>
                No products matched{" "}
                <span className="font-medium text-foreground">
                  "{searchQuery}"
                </span>
                . Try a different keyword or{" "}
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  browse our full collection
                </button>
                .
              </>
            ) : (
              <>No products in this collection yet.</>
            )}
          </p>
        </div>
      ) : (
        <>
          {searchQuery && (
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredProducts.length} result
              {filteredProducts.length !== 1 ? "s" : ""} for{" "}
              <span className="font-medium text-foreground">
                "{searchQuery}"
              </span>
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <Card
                key={Number(product.id)}
                data-ocid={`shop.product.item.${idx + 1}`}
                className="overflow-hidden hover:shadow-elegant transition-shadow group"
              >
                <Link
                  to="/product/$productId"
                  params={{ productId: String(product.id) }}
                >
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
                  <p className="text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">
                    ₹{Number(product.price).toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="gap-2"
                    data-ocid={`shop.product.item.${idx + 1}.button`}
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
