import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsConditionsPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              By accessing and using the Lunara Jewels website ("Website"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Website or services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Use of Website</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              This Website is provided for informational purposes and to facilitate order inquiries for handcrafted oxidized silver jewelry. You may use the Website to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Browse our product catalog</li>
              <li>Submit order requests</li>
              <li>Contact us with questions or inquiries</li>
              <li>Access information about our products and policies</li>
            </ul>
            <p className="mt-4">
              You agree not to use the Website for any unlawful purpose or in any way that could damage, disable, or impair the Website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Order Process</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Lunara Jewels operates on an inquiry-based ordering system:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Submitting an order request through our Website does not constitute a binding purchase agreement</li>
              <li>All orders are subject to confirmation and acceptance by Lunara Jewels</li>
              <li>We reserve the right to refuse or cancel any order for any reason</li>
              <li>Pricing, availability, and specifications are subject to change without notice</li>
              <li>Final pricing, payment terms, and delivery details are confirmed individually with each customer</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We strive to provide accurate product descriptions, images, and specifications. However:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Product images are for illustration purposes and may not exactly represent the actual product</li>
              <li>Colors may vary due to screen settings and photography</li>
              <li>Each piece is handcrafted, so slight variations in oxidation patterns and finish are natural</li>
              <li>We do not warrant that product descriptions or other content are error-free</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Pricing and Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              All prices are listed in Indian Rupees (INR) unless otherwise stated. Prices are subject to change without notice. Payment terms and methods are arranged individually with each customer after order confirmation.
            </p>
            <p>
              Applicable taxes, shipping costs, and any other fees will be communicated before final order confirmation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Shipping and Delivery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Shipping timelines and costs are provided as estimates and may vary based on location and circumstances beyond our control. We are not responsible for delays caused by shipping carriers, customs, or other external factors.
            </p>
            <p>
              Risk of loss and title for products pass to you upon delivery to the shipping carrier.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Returns and Refunds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Our return and exchange policy is detailed on our Returns & Exchange page. Returns must be initiated within 14 days of receiving your order, and items must be unworn and in original condition.
            </p>
            <p>
              Custom or personalized items may not be eligible for return or exchange. We reserve the right to refuse returns that do not meet our policy requirements.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              All content on this Website, including text, images, logos, designs, and product descriptions, is the property of Lunara Jewels and is protected by copyright and other intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, or create derivative works from any content on this Website without our express written permission.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              To the fullest extent permitted by law, Lunara Jewels shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Website or our products.
            </p>
            <p>
              Our total liability for any claim arising out of or related to these Terms or our products shall not exceed the amount you paid for the product in question.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              You agree to indemnify and hold harmless Lunara Jewels, its owners, employees, and agents from any claims, damages, losses, or expenses arising out of your use of the Website or violation of these Terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to these Terms shall be subject to the exclusive jurisdiction of the courts of India.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Website after changes are posted constitutes your acceptance of the modified Terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              If you have questions about these Terms, please contact us through our Contact page or chat feature.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
