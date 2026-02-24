import React, { useState } from 'react';
import AdminGate from '../../components/admin/AdminGate';
import ProductEditorDialog from '../../components/admin/ProductEditorDialog';
import { useProducts } from '../../hooks/useProducts';
import { useAddProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useAdminProducts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Loader2, Plus, Pencil, Trash2, Package } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Product } from '../../backend';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

export default function AdminProductsPage() {
  return (
    <AdminGate>
      <ProductsContent />
    </AdminGate>
  );
}

function ProductsContent() {
  const { data: products, isLoading } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setEditorMode('create');
    setSelectedProduct(null);
    setEditorOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditorMode('edit');
    setSelectedProduct(product);
    setEditorOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct.mutateAsync(productToDelete.id);
      toast.success('Product deleted successfully');
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete product');
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      if (editorMode === 'create') {
        await addProduct.mutateAsync(product);
        toast.success('Product added successfully');
      } else {
        await updateProduct.mutateAsync(product);
        toast.success('Product updated successfully');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to save product');
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Product Catalog</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and pricing.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
            <Button onClick={handleAddProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {!products || products.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-muted-foreground mb-4">No products in your catalog yet.</p>
                <Button onClick={handleAddProduct} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Product
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id.toString()} className="overflow-hidden">
                <div className="aspect-square relative bg-muted">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-bold">
                      ${(Number(product.price) / 100).toFixed(2)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ID: {product.id.toString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ProductEditorDialog
        open={editorOpen}
        onOpenChange={setEditorOpen}
        product={selectedProduct}
        onSave={handleSaveProduct}
        mode={editorMode}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteProduct.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
