import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PackagesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            Packages
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our service packages designed to meet your project requirements.
          </p>
          
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Service Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Contact us to learn about our comprehensive packages and find the perfect fit for your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
