import type { PricingData } from "../types/pricing.types"

// NOTE: Tier names remain the same TypeScript-wise (Basic/Standard/Advanced) to avoid refactoring runtime logic.
// We reinterpret them as AI-Starter (Basic), AI-Professional (Standard), AI-Enterprise (Advanced) in UI copy elsewhere.
export const pricingData: PricingData = [
  {
    group: "AI Development Core",
    features: [
      {
        feature: "AI Code Generation",
        desc: "Automated code scaffolding & acceleration (50% faster delivery)",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Foundational AI-assisted generation.", price: 3000 },
          { name: "Standard", desc: "AI-Professional: Context-aware multi-module generation.", price: 5000 },
          { name: "Advanced", desc: "AI-Enterprise: Architecture-guided, optimization-focused generation.", price: 8000 },
        ],
        isCountable: false,
      },
      {
        feature: "Automated UI/UX Enhancement",
        desc: "AI-driven heuristic & accessibility improvements",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Basic layout & contrast suggestions.", price: 2500 },
          { name: "Standard", desc: "AI-Professional: Interaction flow optimization & heatmap insights.", price: 4000 },
          { name: "Advanced", desc: "AI-Enterprise: Adaptive personalization & predictive UX tuning.", price: 6500 },
        ],
        isCountable: false,
      },
      {
        feature: "Performance AI Optimization",
        desc: "Adaptive performance tuning with AI analysis",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Core Web Vitals baseline improvements.", price: 2000 },
          { name: "Standard", desc: "AI-Professional: Predictive bundle & latency optimization.", price: 3500 },
          { name: "Advanced", desc: "AI-Enterprise: Continuous intelligence loop & anomaly prevention.", price: 5000 },
        ],
        isCountable: false,
      },
      {
        feature: "AI-Powered Testing",
        desc: "Automated test generation & regression detection",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Core flow coverage & smoke tests.", price: 1500 },
          { name: "Standard", desc: "AI-Professional: Mutation + visual diff + integration tests.", price: 3000 },
          { name: "Advanced", desc: "AI-Enterprise: Risk-based prioritization & self-healing suites.", price: 4500 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Business Automation",
    features: [
      {
        feature: "Custom AI Agents",
        desc: "Task-focused autonomous agents reducing manual load",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Single-scope agent with prompt logic.", price: 8000 },
          { name: "Standard", desc: "AI-Professional: Multi-step agent with state & memory.", price: 15000 },
          { name: "Advanced", desc: "AI-Enterprise: Orchestrated agent network w/ monitoring.", price: 25000 },
        ],
        isCountable: false,
      },
      {
        feature: "Intelligent Chatbots",
        desc: "Conversational AI for support & conversion",
        tiers: [
          { name: "Basic", desc: "AI-Starter: FAQ & scripted knowledge.", price: 5000 },
          { name: "Standard", desc: "AI-Professional: Domain-tuned retrieval augmented bot.", price: 12000 },
          { name: "Advanced", desc: "AI-Enterprise: Multi-channel contextual assistant with analytics.", price: 20000 },
        ],
        isCountable: false,
      },
      {
        feature: "Workflow Automation",
        desc: "End-to-end process orchestration",
        tiers: [
          { name: "Basic", desc: "AI-Starter: 2-3 step automation flows.", price: 6000 },
          { name: "Standard", desc: "AI-Professional: Conditional branching & error recovery.", price: 12000 },
          { name: "Advanced", desc: "AI-Enterprise: Multi-system orchestration w/ audit trails.", price: 18000 },
        ],
        isCountable: false,
      },
      {
        feature: "Data Processing AI",
        desc: "Automated enrichment & transformation pipelines",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Scheduled cleansing & normalization.", price: 4000 },
          { name: "Standard", desc: "AI-Professional: Entity extraction & aggregation.", price: 8000 },
          { name: "Advanced", desc: "AI-Enterprise: Predictive classification & adaptive tuning.", price: 15000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "AI Integration",
    features: [
      {
        feature: "API AI Enhancement",
        desc: "Embed intelligent reasoning into existing APIs",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Single AI endpoint integration.", price: 3000 },
          { name: "Standard", desc: "AI-Professional: Multi-provider fallback routing.", price: 6000 },
          { name: "Advanced", desc: "AI-Enterprise: Observability + adaptive model selection.", price: 10000 },
        ],
        isCountable: false,
      },
      {
        feature: "Legacy System AI",
        desc: "Augment legacy platforms with intelligence",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Read-only augmentation layer.", price: 10000 },
          { name: "Standard", desc: "AI-Professional: Bi-directional enhancement & caching.", price: 18000 },
          { name: "Advanced", desc: "AI-Enterprise: Modular modernization & inference adapters.", price: 30000 },
        ],
        isCountable: false,
      },
      {
        feature: "Predictive Analytics",
        desc: "Forecasting & anomaly detection models",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Core trend projections.", price: 7000 },
          { name: "Standard", desc: "AI-Professional: Multi-variable forecasting & dashboards.", price: 14000 },
          { name: "Advanced", desc: "AI-Enterprise: Real-time predictive insights & alerting.", price: 22000 },
        ],
        isCountable: false,
      },
    ],
  },
  {
    group: "Foundational Web Elements",
    features: [
      {
        feature: "Static Page",
        desc: "AI-optimized content-ready static page",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Core layout generation.", price: 2000 },
          { name: "Standard", desc: "AI-Professional: Conversion-focused modular layout.", price: 2600 },
          { name: "Advanced", desc: "AI-Enterprise: Dynamic personalization zones.", price: 3400 },
        ],
        isCountable: true,
        minCount: 1,
      },
      {
        feature: "Dynamic Page",
        desc: "Content/data driven page with smart caching",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Base CRUD powered page.", price: 3200 },
          { name: "Standard", desc: "AI-Professional: Search + filters + semantic tagging.", price: 6400 },
          { name: "Advanced", desc: "AI-Enterprise: User auth + adaptive recommendations.", price: 9800 },
        ],
        isCountable: true,
        minCount: 0,
      },
    ],
  },
  {
    group: "Quality & Lifecycle",
    features: [
      {
        feature: "Maintenance & Support",
        desc: "Proactive AI-informed support & updates",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Core updates & email support.", price: 3000 },
          { name: "Standard", desc: "AI-Professional: Monitoring + prioritized fixes.", price: 6000 },
          { name: "Advanced", desc: "AI-Enterprise: Predictive issue prevention & SLA.", price: 9000 },
        ],
        isCountable: false,
      },
      {
        feature: "Custom Add-ons",
        desc: "Specialized AI or automation feature modules",
        tiers: [
          { name: "Basic", desc: "AI-Starter: Single auxiliary enhancement.", price: 7000 },
          { name: "Standard", desc: "AI-Professional: Integrated advanced feature.", price: 18000 },
          { name: "Advanced", desc: "AI-Enterprise: Bespoke automation/agent ecosystem.", price: 42000 },
        ],
        isCountable: false,
      },
    ],
  },
]
