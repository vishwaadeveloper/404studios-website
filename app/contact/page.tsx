import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-foreground">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get in touch to discuss your project and receive a personalized quote.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fill out our contact form and we'll get back to you within 24 hours.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Schedule a Call</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book a free consultation to discuss your project requirements in detail.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
