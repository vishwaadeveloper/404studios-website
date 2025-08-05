// SEO FAQ Schema for common questions
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a custom website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Website costs vary based on complexity and features. Our pricing calculator helps you get an accurate estimate ranging from $5,000 for basic sites to $50,000+ for complex applications. Use our interactive pricing tool for a personalized quote."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to build a website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Development time depends on project scope. Simple websites take 1-2 weeks, while complex web applications can take 4-12 weeks. We provide detailed timelines during our discovery phase."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing maintenance and support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer comprehensive maintenance packages including security updates, performance optimization, content updates, and technical support. Our maintenance plans ensure your website stays secure and up-to-date."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies do you use for web development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use modern technologies including React, Next.js, TypeScript, Node.js, and various databases. Our tech stack is chosen based on project requirements to ensure optimal performance and scalability."
      }
    },
    {
      "@type": "Question",
      "name": "Can you help with SEO and digital marketing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We provide comprehensive SEO optimization, including technical SEO, on-page optimization, performance improvements, and structured data implementation. We also offer ongoing digital marketing consultation."
      }
    }
  ]
}
