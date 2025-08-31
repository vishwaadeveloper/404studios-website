// SEO FAQ Schema for common questions
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does AI make development faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI accelerates development by generating boilerplate code, auto-refactoring modules, and predicting optimal architecture decisions—resulting in up to 50% faster delivery compared to traditional processes."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cost benefit of AI-powered development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-driven automation reduces manual engineering, testing, and optimization time—typically lowering total project cost by 30% while improving long-term maintainability."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate AI into existing websites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We layer AI capabilities like chatbots, classification, predictive analytics, and workflow automation on top of existing systems without full rewrites through modular integration."
      }
    },
    {
      "@type": "Question",
      "name": "What types of AI agents do you develop?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build custom AI agents for customer support, data processing, lead qualification, operational monitoring, and workflow execution—each tailored to your unique business logic and objectives."
      }
    },
    {
      "@type": "Question",
      "name": "How do AI chatbots improve business efficiency?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI chatbots deliver 24/7 intelligent responses, reduce support workload, increase lead conversion, and provide structured feedback data—allowing teams to focus on higher-value tasks."
      }
    }
  ]
}
