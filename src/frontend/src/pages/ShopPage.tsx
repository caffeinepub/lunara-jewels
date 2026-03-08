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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../state/cart";

// Gender category mapping — Women: 4-8, 14-16 | Men: 10, 12, 17
const WOMEN_IDS = new Set([4, 5, 6, 7, 8, 14, 15, 16]);
const MEN_IDS = new Set([10, 12, 17]);

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

  // Apply gender filter first, then search filter
  const genderFiltered =
    activeTab === "all"
      ? allProducts
      : activeTab === "women"
        ? allProducts.filter((p) => WOMEN_IDS.has(Number(p.id)))
        : allProducts.filter((p) => MEN_IDS.has(Number(p.id)));

  const filteredProducts = searchQuery.trim()
    ? genderFiltered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : genderFiltered;

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
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as GenderTab)}
        className="mb-8"
      >
        <TabsList className="h-11 px-1 gap-1 bg-muted/60 rounded-full w-auto inline-flex">
          <TabsTrigger
            value="all"
            data-ocid="shop.all.tab"
            className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="women"
            data-ocid="shop.women.tab"
            className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            Women
          </TabsTrigger>
          <TabsTrigger
            value="men"
            data-ocid="shop.men.tab"
            className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            Men
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
      ) : allProducts.length === 0 ? (
        /* Truly empty — no products at all */
        <div
          className="flex flex-col items-center justify-center py-32 text-center"
          data-ocid="shop.empty_state"
        >
          {/* Decorative ring */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary/60" />
              </div>
            </div>
            {/* Orbiting dot */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-primary/40" />
            <span className="absolute bottom-2 left-0 w-1.5 h-1.5 rounded-full bg-accent/50" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
            Our collection is coming soon
          </h2>
          <p className="text-muted-foreground max-w-xs leading-relaxed text-base">
            Each piece is being curated with care. Check back shortly to
            discover our handcrafted oxidized silver jewelry.
          </p>

          {/* Divider ornament */}
          <div className="flex items-center gap-3 mt-8 text-primary/30">
            <span className="block h-px w-10 bg-primary/20" />
            <span className="text-xs tracking-[0.3em] uppercase font-medium text-muted-foreground/60">
              Lunara Jewels
            </span>
            <span className="block h-px w-10 bg-primary/20" />
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Search / filter returned no results */
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
                {activeTab !== "all" && (
                  <> in the {activeTab === "women" ? "Women" : "Men"} section</>
                )}
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
              <>No products in this category yet.</>
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
              {activeTab !== "all" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-medium text-foreground">
                    {activeTab === "women" ? "Women" : "Men"}
                  </span>
                </>
              )}
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
