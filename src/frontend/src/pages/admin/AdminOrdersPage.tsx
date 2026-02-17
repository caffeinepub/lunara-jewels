import React from 'react';
import AdminGate from '../../components/admin/AdminGate';
import { useListOrderRequests } from '../../hooks/useAdminOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Loader2, Package, Mail, User, FileText, Calendar } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '../../components/ui/button';

export default function AdminOrdersPage() {
  return (
    <AdminGate>
      <OrdersContent />
    </AdminGate>
  );
}

function OrdersContent() {
  const { data: orders, isLoading, error } = useListOrderRequests();

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center space-y-4">
          <p className="text-destructive">Failed to load orders. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Order Requests</h1>
            <p className="text-muted-foreground">
              View and manage customer order requests.
            </p>
          </div>
          <Link to="/admin">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </div>

        {!orders || orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No order requests yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id.toString()}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif flex items-center gap-2">
                        Order #{order.id.toString()}
                        <Badge variant="outline">
                          {new Date(Number(order.timestamp) / 1000000).toLocaleDateString()}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Total: ${(Number(order.totalAmount) / 100).toFixed(2)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Customer:</span>
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                        <span>{order.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Date:</span>
                        <span>
                          {new Date(Number(order.timestamp) / 1000000).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {order.shippingNote && (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <span className="font-medium">Shipping Note:</span>
                            <p className="text-muted-foreground mt-1">{order.shippingNote}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm bg-muted/30 rounded-lg p-3"
                        >
                          <div>
                            <span className="font-medium">Product ID: {item.productId.toString()}</span>
                          </div>
                          <div className="text-muted-foreground">
                            Quantity: {item.quantity.toString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
