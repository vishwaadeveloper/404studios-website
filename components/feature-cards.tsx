"use client";

import { MagicCard } from "@/components/magicui/magic-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  Rocket, 
  Users, 
  GraduationCap, 
  Wrench, 
  Settings, 
  LifeBuoy, 
  MessageCircle, 
  BarChart3, 
  Eye 
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const featureData = [
  {
    id: 1,
    title: "AI-Powered Speed",
    description: "Lightning-fast development with cutting-edge AI tools and automation that accelerate your project timeline.",
    primaryIcon: Zap,
    secondaryIcon: Rocket,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    glowColor: "#f59e0b",
    borderDelay: 0,
  },
  {
    id: 2,
    title: "Expert Team", 
    description: "Seasoned professionals with years of experience delivering world-class solutions for businesses.",
    primaryIcon: Users,
    secondaryIcon: GraduationCap,
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    glowColor: "#8b5cf6",
    borderDelay: 0.5,
  },
  {
    id: 3,
    title: "Custom Solutions",
    description: "Tailored approaches designed specifically for your unique business needs and objectives.",
    primaryIcon: Wrench,
    secondaryIcon: Settings,
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    glowColor: "#10b981",
    borderDelay: 1.0,
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Round-the-clock assistance ensuring your project stays on track with immediate help when needed.",
    primaryIcon: LifeBuoy,
    secondaryIcon: MessageCircle,
    gradient: "from-indigo-400 via-blue-500 to-cyan-500",
    glowColor: "#3b82f6",
    borderDelay: 1.5,
  },
  {
    id: 5,
    title: "Transparent Process",
    description: "Clear communication and visible progress tracking so you're always informed about your project status.",
    primaryIcon: BarChart3,
    secondaryIcon: Eye,
    gradient: "from-pink-400 via-rose-500 to-red-500",
    glowColor: "#ec4899",
    borderDelay: 2.0,
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof featureData[0], index: number }) => {
  const { theme } = useTheme();
  const PrimaryIcon = feature.primaryIcon;
  const SecondaryIcon = feature.secondaryIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="group relative h-full"
    >
      <Card className="relative h-full min-h-[320px] overflow-hidden border-0 bg-transparent shadow-none">
        <MagicCard
          className="h-full min-h-[320px] p-6 backdrop-blur-sm flex flex-col"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          gradientSize={300}
          gradientOpacity={0.8}
        >
          <div className="relative h-full min-h-[320px] flex flex-col">
            {/* Animated Border Beam */}
            <BorderBeam
              size={250}
              duration={8}
              delay={feature.borderDelay}
              borderWidth={2}
              className={`from-transparent via-[${feature.glowColor}] to-transparent`}
            />
            
            <CardHeader className="relative z-10 pb-4 pt-2 flex-shrink-0">
              {/* Icon Container with Shimmer Effect */}
              <div className="relative mb-4 flex items-center justify-center">
                <div className="relative">
                  {/* Primary Icon with Glow */}
                  <div 
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:scale-110`}
                  />
                  <div 
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${feature.gradient} p-0.5 transition-all duration-500 group-hover:scale-110`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-background/90 backdrop-blur-sm">
                      <PrimaryIcon 
                        className="h-8 w-8 transition-all duration-500 group-hover:scale-110" 
                        style={{ color: feature.glowColor }}
                      />
                    </div>
                  </div>
                  
                  {/* Secondary Icon - Floating */}
                  <motion.div
                    className="absolute -right-2 -top-2"
                    animate={{ 
                      y: [0, -4, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-lg ring-2 ring-white/10">
                      <SecondaryIcon 
                        className="h-4 w-4 opacity-70 transition-all duration-500 group-hover:opacity-100" 
                        style={{ color: feature.glowColor }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              <CardTitle className="text-center text-xl font-bold tracking-tight group-hover:text-foreground transition-colors duration-300">
                {feature.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10 px-0 pb-2 flex-grow flex flex-col justify-center">
              <CardDescription className="text-center text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                {feature.description}
              </CardDescription>
            </CardContent>

            {/* Subtle Gradient Overlay - Full Card Coverage */}
            <div 
              className={`absolute inset-0 opacity-0 bg-gradient-to-t ${feature.gradient} transition-opacity duration-500 group-hover:opacity-10 rounded-lg pointer-events-none z-0`}
            />

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full"
                  style={{ backgroundColor: feature.glowColor }}
                  initial={{ 
                    x: Math.random() * 300,
                    y: Math.random() * 400,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [null, -20, null],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </MagicCard>
      </Card>
    </motion.div>
  );
};

export const FeatureCards = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
      {/* Section Header */}
      <motion.div 
        className="mx-auto max-w-7xl text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Why Choose 404 Studios?
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the key features that make us the perfect partner for your next digital project.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featureData.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" 
               style={{
                 clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)'
               }} 
          />
        </div>
      </div>
    </section>
  );
};
