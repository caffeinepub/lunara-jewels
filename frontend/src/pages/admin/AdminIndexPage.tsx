import React from 'react';
import AdminGate from '../../components/admin/AdminGate';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Package, ShoppingCart } from 'lucide-react';

export default function AdminIndexPage() {
  return (
    <AdminGate>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your products and view customer orders.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/admin/orders" className="group">
              <Card className="transition-all hover:shadow-lg hover:border-accent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/10 p-3">
                      <ShoppingCart className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle className="font-serif">Order Requests</CardTitle>
                      <CardDescription>View and manage customer orders</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Access all submitted order requests with customer details and order information.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/admin/products" className="group">
              <Card className="transition-all hover:shadow-lg hover:border-accent">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/10 p-3">
                      <Package className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle className="font-serif">Product Catalog</CardTitle>
                      <CardDescription>Add, edit, and remove products</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage your product inventory, update prices, and maintain your catalog.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
