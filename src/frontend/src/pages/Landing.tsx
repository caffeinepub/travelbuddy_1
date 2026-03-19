import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  Globe,
  Luggage,
  MessageSquare,
  Plane,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// ─── Animated counter ───────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current)
        ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
    });
    return unsub;
  }, [spring, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

// ─── Feature card ────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-card rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover transition-shadow cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground mb-2 text-lg leading-snug">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// ─── Step ────────────────────────────────────────────────────────────
function Step({
  num,
  title,
  desc,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-4">
        {num}
      </div>
      <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">
        {desc}
      </p>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────
export default function Landing() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Safety & SOS",
      desc: "Travel with confidence. SOS alerts, woman safety features, and emergency contacts always ready.",
    },
    {
      icon: Luggage,
      title: "Luggage Sharing",
      desc: "Share luggage allowance with co-travelers going the same way and save on baggage fees.",
    },
    {
      icon: Users,
      title: "Networking",
      desc: "Jobs, education, dating, and lifestyle connections — all happening as you travel.",
    },
    {
      icon: Compass,
      title: "Discover",
      desc: "Find co-travelers on your exact flight or train and plan ahead before boarding.",
    },
    {
      icon: MessageSquare,
      title: "Secure Messages",
      desc: "End-to-end encrypted chat and audio/video via Aroga messenger — private and fast.",
    },
    {
      icon: Plane,
      title: "My Travels",
      desc: "Track your flights and trains in real time, all in one beautifully simple dashboard.",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden"
        data-ocid="landing.section"
      >
        {/* gradient background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.18 0.06 265) 0%, oklch(0.26 0.12 260) 45%, oklch(0.32 0.14 210) 100%)",
          }}
        />
        {/* decorative blobs */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 -z-10 blur-3xl"
          style={{ background: "oklch(0.5 0.19 260)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 -z-10 blur-3xl"
          style={{ background: "oklch(0.62 0.1 190)" }}
        />
        {/* grid pattern overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img
            src="/assets/uploads/Cheerful-TravelMate-logo-design-1.png"
            alt="TravelMate"
            className="h-28 w-auto object-contain mx-auto drop-shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
        >
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span className="text-white/90 text-xs font-medium tracking-wide">
            The Future of Travel Connectivity
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight max-w-4xl mb-6"
        >
          Travel Smarter.{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, oklch(0.82 0.18 200), oklch(0.72 0.16 170))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connect Better.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg sm:text-xl text-white/75 max-w-2xl mb-10 leading-relaxed"
        >
          Meet co-travelers on your exact flight or train. Coordinate safety,
          share luggage, build real-world connections — before you even board.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" data-ocid="landing.primary_button">
            <Button
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 font-semibold px-8 h-12 shadow-xl rounded-xl gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href="#how-it-works" data-ocid="landing.secondary_button">
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 h-12 rounded-xl backdrop-blur-sm"
            >
              How It Works
            </Button>
          </a>
        </motion.div>

        {/* floating badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 flex flex-wrap gap-3 justify-center"
        >
          {[
            "✈️ Air Travel",
            "🚆 Rail Travel",
            "🔒 End-to-End Encrypted",
            "🌍 Global Network",
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.5 0.19 260), oklch(0.56 0.14 220), oklch(0.62 0.1 190))",
        }}
        data-ocid="stats.section"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 50, suffix: "K+", label: "Travelers" },
            { value: 120, suffix: "+", label: "Countries" },
            { value: 1, suffix: "M+", label: "Connections Made" },
            { value: 99, suffix: "%", label: "Safety Rating" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl font-extrabold text-white">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/70 text-sm mt-1 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────────────── */}
      <section
        className="py-24 px-4 bg-background"
        id="features"
        data-ocid="features.section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Zap className="w-3 h-3" /> Everything You Need
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Built for Real-World Travel
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From safety to socializing, TravelMate handles every aspect of
              your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 px-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.968 0.008 255) 0%, oklch(0.94 0.018 255) 100%)",
        }}
        data-ocid="howto.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
              <Globe className="w-3 h-3" /> Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Up & Running in Minutes
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three steps to your first co-traveler connection.
            </p>
          </motion.div>

          <div className="relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-primary via-accent to-primary/50" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
              <Step
                num="1"
                title="Create Your Profile"
                desc="Sign in quickly and build your traveler profile with your preferences and needs."
                delay={0}
              />
              <Step
                num="2"
                title="Add Travel Details"
                desc="Enter your flight or train number, date, seat, and destination."
                delay={0.1}
              />
              <Step
                num="3"
                title="Discover & Connect"
                desc="Browse co-travelers on your route, message securely, and coordinate in real life."
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section
        className="relative py-28 px-4 text-center overflow-hidden"
        data-ocid="cta.section"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 265) 0%, oklch(0.3 0.15 250) 50%, oklch(0.35 0.12 210) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-20 -z-10 blur-3xl"
          style={{ background: "oklch(0.62 0.1 190)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/assets/uploads/Cheerful-TravelMate-logo-design-1.png"
            alt="TravelMate"
            className="h-20 w-auto object-contain mx-auto mb-6 drop-shadow-xl"
          />
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            Join TravelMate Today
          </h2>
          <p className="text-white/70 text-lg max-w-lg mx-auto mb-10">
            Thousands of travelers are already connecting smarter. Your journey
            starts here.
          </p>
          <Link to="/" data-ocid="cta.primary_button">
            <Button
              size="lg"
              className="bg-white text-foreground hover:bg-white/90 font-bold px-10 h-14 rounded-xl shadow-2xl text-base gap-2"
            >
              Sign In <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
