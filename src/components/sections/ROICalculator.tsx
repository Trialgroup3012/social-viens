"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

interface IndustryData {
  label: string;
  leadMultiplier: number;
  revenuePerLead: number;
}

const industryData: Record<string, IndustryData> = {
  "real-estate": {
    label: "Real Estate",
    leadMultiplier: 8,
    revenuePerLead: 50000,
  },
  healthcare: {
    label: "Healthcare",
    leadMultiplier: 6,
    revenuePerLead: 8000,
  },
  "law-firms": {
    label: "Law Firms",
    leadMultiplier: 5,
    revenuePerLead: 25000,
  },
  education: {
    label: "Education",
    leadMultiplier: 7,
    revenuePerLead: 15000,
  },
  beauty: {
    label: "Beauty",
    leadMultiplier: 9,
    revenuePerLead: 3000,
  },
  restaurants: {
    label: "Restaurants",
    leadMultiplier: 10,
    revenuePerLead: 2000,
  },
  "e-commerce": {
    label: "E-Commerce",
    leadMultiplier: 12,
    revenuePerLead: 5000,
  },
  startups: {
    label: "Startups",
    leadMultiplier: 7,
    revenuePerLead: 10000,
  },
};

interface ROIResult {
  leads: number;
  revenueGrowth: number;
  roi: number;
  annualRevenue: number;
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1200,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const startVal = prevValue.current;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min(
        (timestamp - startTime.current) / duration,
        1
      );
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (value - startVal) * eased;
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevValue.current = value;
        setDisplay(value);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  const formatted = display.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function ROICalculator() {
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState(50000);
  const [currentRevenue, setCurrentRevenue] = useState("");
  const [results, setResults] = useState<ROIResult | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);
  // Fix Radix Select hydration mismatch — only render Select after mount
  const mounted = useMounted();

  const calculateROI = useCallback(() => {
    if (!industry) return;

    const data = industryData[industry];
    const leads = (budget / 5000) * data.leadMultiplier;
    const revenueGrowth = leads * data.revenuePerLead;
    const roi = ((revenueGrowth - budget) / budget) * 100;
    const annualRevenue = revenueGrowth * 12;

    setResults({
      leads: Math.round(leads),
      revenueGrowth: Math.round(revenueGrowth),
      roi: Math.round(roi),
      annualRevenue: Math.round(annualRevenue),
    });
    setIsCalculated(true);
  }, [industry, budget]);

  const formatCurrency = (val: number) =>
    "₹" +
    val.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });

  const resultCards = results
    ? [
        {
          icon: <Users className="w-5 h-5" />,
          label: "Estimated Monthly Leads",
          value: results.leads,
          prefix: "",
          suffix: "",
          decimals: 0,
        },
        {
          icon: <DollarSign className="w-5 h-5" />,
          label: "Estimated Revenue Growth",
          value: results.revenueGrowth,
          prefix: "₹",
          suffix: "",
          decimals: 0,
        },
        {
          icon: <TrendingUp className="w-5 h-5" />,
          label: "Projected ROI",
          value: results.roi,
          prefix: "",
          suffix: "%",
          decimals: 0,
        },
        {
          icon: <BarChart3 className="w-5 h-5" />,
          label: "Projected Annual Revenue",
          value: results.annualRevenue,
          prefix: "₹",
          suffix: "",
          decimals: 0,
        },
      ]
    : [];

  return (
    <section id="roi-calculator" className="relative py-24 overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Calculator className="w-4 h-4" />
            Free Growth Estimator
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cream">Calculate Your</span>{" "}
            <span className="text-gold-gradient">Growth Potential</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sv-muted text-lg">
            See how much revenue you could generate with our strategies
          </p>
        </motion.div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-6 lg:p-8 border border-gold/10 h-full">
              <h3 className="text-xl font-bold text-cream mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-bronze flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-sv-bg" />
                </div>
                Your Business Details
              </h3>

              <div className="space-y-6">
                {/* Industry selector */}
                <div>
                  <label className="text-sm font-medium text-cream mb-2 block">
                    Industry
                  </label>
                  {mounted ? (
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="w-full bg-sv-elevated border-gold/20 text-cream h-11 focus:ring-gold/30">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-sv-elevated border-gold/20">
                        {Object.entries(industryData).map(([key, data]) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="text-cream focus:bg-gold/10 focus:text-gold"
                          >
                            {data.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="w-full h-11 rounded-md bg-sv-elevated border border-gold/20 flex items-center px-3 text-sm text-sv-muted">
                      Select your industry
                    </div>
                  )}
                </div>

                {/* Budget slider */}
                <div>
                  <label className="text-sm font-medium text-cream mb-2 block">
                    Monthly Marketing Budget
                  </label>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-sv-muted">₹10,000</span>
                    <span className="text-lg font-bold text-gold-gradient">
                      {formatCurrency(budget)}
                    </span>
                    <span className="text-xs text-sv-muted">₹5,00,000</span>
                  </div>
                  <Slider
                    value={[budget]}
                    min={10000}
                    max={500000}
                    step={5000}
                    onValueChange={(val) => setBudget(val[0])}
                    className="[&_[data-slot=slider-track]]:bg-sv-elevated [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-gold [&_[data-slot=slider-range]]:to-gold-light [&_[data-slot=slider-thumb]]:border-gold [&_[data-slot=slider-thumb]]:bg-sv-bg [&_[data-slot=slider-thumb]]:shadow-gold/30 [&_[data-slot=slider-thumb]]:shadow-md"
                  />
                </div>

                {/* Current Revenue input */}
                <div>
                  <label className="text-sm font-medium text-cream mb-2 block">
                    Current Monthly Revenue (optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold text-sm font-medium">
                      ₹
                    </span>
                    <Input
                      type="text"
                      placeholder="e.g. 2,00,000"
                      value={currentRevenue}
                      onChange={(e) => setCurrentRevenue(e.target.value)}
                      className="pl-8 bg-sv-elevated border-gold/20 text-cream h-11 placeholder:text-sv-muted/50 focus-visible:border-gold/40 focus-visible:ring-gold/20"
                    />
                  </div>
                </div>

                {/* Calculate button */}
                <Button
                  onClick={calculateROI}
                  disabled={!industry}
                  className="w-full py-5 text-sm font-semibold bg-gradient-to-r from-gold via-gold-light to-gold text-sv-bg hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 h-auto"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate ROI
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-6 lg:p-8 border border-gold/10 h-full">
              <h3 className="text-xl font-bold text-cream mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-bronze flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sv-bg" />
                </div>
                Your Growth Potential
              </h3>

              {!isCalculated ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-gold/5 flex items-center justify-center mb-4">
                    <BarChart3 className="w-10 h-10 text-gold/30" />
                  </div>
                  <p className="text-sv-muted text-sm max-w-[240px]">
                    Fill in your business details and hit calculate to see your
                    projected growth
                  </p>
                </div>
              ) : (
                /* Results */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {resultCards.map((card) => (
                      <div
                        key={card.label}
                        className="rounded-xl bg-sv-elevated/60 border border-gold/10 p-4 md:p-5 text-center hover:border-gold/20 transition-colors duration-300"
                      >
                        {/* Gold icon */}
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
                          <span className="text-gold">{card.icon}</span>
                        </div>

                        {/* Large number */}
                        <p className="text-xl md:text-2xl font-bold text-gold-gradient mb-1">
                          <AnimatedCounter
                            value={card.value}
                            prefix={card.prefix}
                            suffix={card.suffix}
                            decimals={card.decimals}
                          />
                        </p>

                        {/* Label */}
                        <p className="text-xs md:text-sm text-cream/80">
                          {card.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-gold/10">
                    <Button
                      asChild
                      className="w-full py-5 text-sm font-semibold bg-transparent border-2 border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-auto"
                    >
                      <a href="#contact-form">
                        Get Your Custom Growth Plan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <p className="text-center text-sv-muted/60 text-xs mt-3">
                      Results are estimates based on industry averages. Actual
                      results may vary.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
