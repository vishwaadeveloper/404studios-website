import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-foreground">Services</h1>
            <p className="text-muted-foreground text-lg">
              Our professional services
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Web Development</CardTitle>
                <CardDescription>Modern web applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Custom web development solutions using modern technologies.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Mobile Apps</CardTitle>
                <CardDescription>Cross-platform mobile solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Native and cross-platform mobile application development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
