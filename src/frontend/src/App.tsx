import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import OrderRequestPage from './pages/OrderRequestPage';
import ChatPage from './pages/ChatPage';
import AdminIndexPage from './pages/admin/AdminIndexPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import CollectionsPage from './pages/info/CollectionsPage';
import PricingOffersPage from './pages/info/PricingOffersPage';
import CustomizationPage from './pages/info/CustomizationPage';
import CertificationsQualityPage from './pages/info/CertificationsQualityPage';
import ShippingDeliveryPage from './pages/info/ShippingDeliveryPage';
import ReturnsExchangePage from './pages/info/ReturnsExchangePage';
import PaymentMethodsPage from './pages/info/PaymentMethodsPage';
import CustomerReviewsPage from './pages/info/CustomerReviewsPage';
import FaqPage from './pages/info/FaqPage';
import BlogPage from './pages/info/BlogPage';
import OrderTrackingPage from './pages/info/OrderTrackingPage';
import PrivacyPolicyPage from './pages/info/PrivacyPolicyPage';
import TermsConditionsPage from './pages/info/TermsConditionsPage';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shop',
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product/$productId',
  component: ProductDetailsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const orderRequestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-request',
  component: OrderRequestPage,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: ChatPage,
});

const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/collections',
  component: CollectionsPage,
});

const pricingOffersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing-offers',
  component: PricingOffersPage,
});

const customizationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customization',
  component: CustomizationPage,
});

const certificationsQualityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/certifications-quality',
  component: CertificationsQualityPage,
});

const shippingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/shipping',
  component: ShippingDeliveryPage,
});

const returnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/returns',
  component: ReturnsExchangePage,
});

const paymentMethodsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-methods',
  component: PaymentMethodsPage,
});

const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reviews',
  component: CustomerReviewsPage,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/faq',
  component: FaqPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order-tracking',
  component: OrderTrackingPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsConditionsPage,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminIndexPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/orders',
  component: AdminOrdersPage,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/products',
  component: AdminProductsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  aboutRoute,
  contactRoute,
  cartRoute,
  orderRequestRoute,
  chatRoute,
  collectionsRoute,
  pricingOffersRoute,
  customizationRoute,
  certificationsQualityRoute,
  shippingRoute,
  returnsRoute,
  paymentMethodsRoute,
  reviewsRoute,
  faqRoute,
  blogRoute,
  orderTrackingRoute,
  privacyRoute,
  termsRoute,
  adminIndexRoute,
  adminOrdersRoute,
  adminProductsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
