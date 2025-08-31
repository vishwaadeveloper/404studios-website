import {
  Cpu,
  Bot,
  Zap,
  Settings2,
  BrainCircuit,
  MessageSquare,
  LineChart,
  Gauge,
  Cable,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { FeatureCatalog } from '../types/features.types';

export const featureCatalogData: FeatureCatalog = [
  {
    group: "AI Development Core",
    icon: <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />,
    description: "Foundational intelligent build capabilities for accelerated delivery",
    features: [
      {
        feature: "AI Code Generation",
        explanation: "Automated, optimization-aware code scaffolding & refactoring.",
        tiers: [
          { tier: "Basic", include: "Starter templates & component generation." },
          { tier: "Standard", include: "Contextual multi-module generation & refactoring." },
          { tier: "Advanced", include: "Architecture-guided output with performance tuning." },
        ],
      },
      {
        feature: "Smart UI/UX",
        explanation: "AI-driven layout, accessibility and interaction refinement.",
        tiers: [
          { tier: "Basic", include: "Heuristic-based layout suggestions." },
          { tier: "Standard", include: "Flow optimization & contrast/accessibility improvements." },
          { tier: "Advanced", include: "Predictive adaptive interfaces & personalization." },
        ],
      },
      {
        feature: "Performance AI",
        explanation: "Continuous telemetry-led performance enhancement.",
        tiers: [
          { tier: "Basic", include: "Baseline Core Web Vitals uplift." },
          { tier: "Standard", include: "Intelligent asset & bundle optimization cycles." },
          { tier: "Advanced", include: "Self-adjusting runtime profiling & anomaly prevention." },
        ],
      },
      {
        feature: "Quality Assurance",
        explanation: "AI-assisted test generation & defect detection.",
        tiers: [
          { tier: "Basic", include: "Smoke & core flow automation." },
          { tier: "Standard", include: "Mutation + integration + visual diff coverage." },
          { tier: "Advanced", include: "Risk-based prioritization & self-healing suites." },
        ],
      },
    ],
  },
  {
    group: "Business Automation",
    icon: <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />,
    description: "Intelligent automation layers reducing operational overhead",
    features: [
      {
        feature: "Custom AI Agents",
        explanation: "Autonomous task agents orchestrating business logic.",
        tiers: [
          { tier: "Basic", include: "Single-scope deterministic agent." },
          { tier: "Standard", include: "Multi-step contextual agent with memory." },
          { tier: "Advanced", include: "Distributed agent network & supervision." },
        ],
      },
      {
        feature: "Chatbot Integration",
        explanation: "Conversational AI for support & conversion.",
        tiers: [
          { tier: "Basic", include: "FAQ & intent classification bot." },
          { tier: "Standard", include: "Retrieval-augmented domain knowledge agent." },
          { tier: "Advanced", include: "Multi-channel adaptive assistant with analytics." },
        ],
      },
      {
        feature: "Workflow Automation",
        explanation: "Process orchestration & trigger-based execution.",
        tiers: [
          { tier: "Basic", include: "Linear 2–3 step flows." },
          { tier: "Standard", include: "Conditional branching, retries & logging." },
          { tier: "Advanced", include: "Cross-system orchestration & audit trails." },
        ],
      },
      {
        feature: "Data Intelligence",
        explanation: "AI-powered enrichment, classification & insights.",
        tiers: [
          { tier: "Basic", include: "Scheduled cleansing & normalization." },
          { tier: "Standard", include: "Entity extraction + aggregation dashboards." },
          { tier: "Advanced", include: "Predictive modeling & real-time scoring." },
        ],
      },
    ],
  },
  {
    group: "AI Integration Services",
    icon: <Cable className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />,
    description: "Embedding intelligence into existing platforms & data flows",
    features: [
      {
        feature: "Legacy Enhancement",
        explanation: "Wrap and modernize legacy systems with inference layers.",
        tiers: [
          { tier: "Basic", include: "Read-only augmentation adapter." },
          { tier: "Standard", include: "Bi-directional sync + caching." },
          { tier: "Advanced", include: "Modular modernization & inference routing." },
        ],
      },
      {
        feature: "API Intelligence",
        explanation: "Smart API orchestration & LLM provider abstraction.",
        tiers: [
          { tier: "Basic", include: "Single AI provider integration." },
          { tier: "Standard", include: "Multi-provider fallback routing." },
          { tier: "Advanced", include: "Adaptive model selection + observability." },
        ],
      },
      {
        feature: "Predictive Analytics",
        explanation: "Forecasting & anomaly detection intelligence.",
        tiers: [
          { tier: "Basic", include: "Trend projections & KPI baselines." },
          { tier: "Standard", include: "Multi-variable forecasting & dashboards." },
          { tier: "Advanced", include: "Real-time streaming predictive alerts." },
        ],
      },
      {
        feature: "Smart Monitoring",
        explanation: "AI-observed performance, stability & usage telemetry.",
        tiers: [
          { tier: "Basic", include: "Core metric tracking & notifications." },
          { tier: "Standard", include: "Anomaly detection & trend insights." },
          { tier: "Advanced", include: "Proactive remediation suggestions & root cause analysis." },
        ],
      },
    ],
  },
  {
    group: "Intelligent Experience Layer",
    icon: <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />,
    description: "Adaptive, optimized, user-facing intelligence",
    features: [
      {
        feature: "AI Content Management",
        explanation: "Generation, moderation & personalization workflows.",
        tiers: [
          { tier: "Basic", include: "Assisted draft generation + moderation queue." },
          { tier: "Standard", include: "Multi-channel enrichment & tagging." },
          { tier: "Advanced", include: "Personalized delivery & semantic clustering." },
        ],
      },
      {
        feature: "Automated Testing",
        explanation: "AI-authored and self-healing test frameworks.",
        tiers: [
          { tier: "Basic", include: "Core regression coverage." },
          { tier: "Standard", include: "Visual & mutation testing harness." },
          { tier: "Advanced", include: "Adaptive flake detection & prioritization." },
        ],
      },
      {
        feature: "AI-Enhanced SEO",
        explanation: "Semantic optimization & competitive intelligence.",
        tiers: [
          { tier: "Basic", include: "Metadata + baseline semantic suggestions." },
          { tier: "Standard", include: "Keyword gap + structured data automation." },
          { tier: "Advanced", include: "Continuous AI content scoring & strategy insights." },
        ],
      },
      {
        feature: "User Feedback Intelligence",
        explanation: "Automated clustering & sentiment evaluation.",
        tiers: [
          { tier: "Basic", include: "Feedback aggregation & tagging." },
          { tier: "Standard", include: "Sentiment scoring & trend grouping." },
          { tier: "Advanced", include: "Predictive churn risk & feature impact scoring." },
        ],
      },
    ],
  },
  {
    group: "Lifecycle & Security",
    icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
    description: "Post-launch assurance, resilience & evolution",
    features: [
      {
        feature: "Maintenance & Support",
        explanation: "Predictive maintenance & assisted triage.",
        tiers: [
          { tier: "Basic", include: "Core patching & uptime monitoring." },
          { tier: "Standard", include: "Automated diagnostics & prioritized response." },
          { tier: "Advanced", include: "Predictive incident prevention & SLA guarantees." },
        ],
      },
      {
        feature: "Security & Compliance AI",
        explanation: "Adaptive vulnerability & policy intelligence.",
        tiers: [
          { tier: "Basic", include: "Static scans & dependency audit." },
          { tier: "Standard", include: "Runtime anomaly detection & policy checks." },
          { tier: "Advanced", include: "Threat modeling & automated remediation proposals." },
        ],
      },
      {
        feature: "Custom Add-ons",
        explanation: "Specialized AI or immersive capability deployment.",
        tiers: [
          { tier: "Basic", include: "Single auxiliary AI enhancement." },
          { tier: "Standard", include: "Integrated workflow or interface module." },
          { tier: "Advanced", include: "Bespoke autonomous or multi-agent system." },
        ],
      },
    ],
  },
];
