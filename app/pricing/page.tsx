import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            Pricing
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Contact us for custom pricing tailored to your project needs.
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Get a Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Reach out to discuss your project requirements and receive a personalized quote.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
