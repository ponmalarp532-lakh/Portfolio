import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, BookOpen, Award, Terminal, Eye, ChevronDown, ChevronUp, CheckCircle, Target } from "lucide-react";
import { RESUME_DATA } from "../types";

export default function About({ activeSection }: { activeSection?: string }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const isActive = activeSection === "about";

  const toggleCard = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
    }
  };

  const overviewCards = [
    {
      id: "summary",
      title: "Security Mission & Summary",
      icon: Shield,
      summary: "Technology enthusiast transforming secure ideas into live, robust software applications.",
      fullText: "By marrying software engineering with proactive defense architectures, I explore complex web applications and system vulnerabilities. I am committed to creating high-utility, resilient products that respect user privacy, resist modern threat vectors, and integrate scalable infrastructure like Supabase and Vercel.",
      accent: "from-neon-blue to-cyan-500"
    },
    {
      id: "academic",
      title: "Academic Track",
      icon: BookOpen,
      summary: "Currently pursuing B.Tech in Information Technology at CMS College of Engineering and Technology.",
      fullText: "With an expected graduation in 2027, my current status is Third Year — Sixth Semester. Focus areas in my degree include computer networks, cryptography baselines, database administration, web development algorithms, and computer system security modeling.",
      accent: "from-blue-500 to-neon-purple"
    },
    {
      id: "hackathons",
      title: "Innovation & Hackathons",
      icon: Award,
      summary: "Winner of multiple Hackathons. Rapid builder of 6+ real-world web solutions.",
      fullText: "I thrive in high-pressure hackathon sprints where ideation converges with immediate execution. Winning multiple competitions has honed my capability to engineer full-stack Minimal Viable Products (MVPs) that function under real-world scrutiny, leveraging reliable cloud databases and high-performance client architectures.",
      accent: "from-neon-purple to-pink-500"
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-dark-bg border-t border-white/5 overflow-hidden"
    >
      {/* Background Decorative Matrix Grid elements */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-blue drop-shadow-[0_0_8px_#00F0FF]" : "text-neon-blue/80"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-blue ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Identity Directory</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "text-white"
          }`}>
            About the <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Developer</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            A meticulous third-year Information Technology student with a core concentration in secure systems development, threat intelligence, and rapid web prototyping.
          </p>
        </div>

        {/* Bento Grid of Expandable Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {overviewCards.map((card) => {
            const IconComponent = card.icon;
            const isExpanded = expandedCard === card.id;

            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => toggleCard(card.id)}
                className={`interactive-card glass-panel rounded-2xl p-6 cursor-pointer border border-white/5 hover:border-neon-blue/20 transition-all duration-300 relative overflow-hidden group ${
                  isExpanded ? "md:col-span-3 bg-neutral-900/45 border-neon-blue/30" : "bg-neutral-900/20"
                }`}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ layout: { type: "spring", stiffness: 300, damping: 25 } }}
              >
                {/* Glowing subtle card accent */}
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${card.accent}`} />

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-blue/40 group-hover:bg-neon-blue/5 transition-colors">
                      <IconComponent className="w-6 h-6 text-neon-blue" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-lg group-hover:text-neon-blue transition-colors">
                        {card.title}
                      </h3>
                      {!isExpanded && (
                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                          Click to expand
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="p-1 rounded bg-white/5 text-white/50 group-hover:text-neon-blue transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <div className="mt-6 ml-2">
                  <p className="text-white/80 font-sans text-sm leading-relaxed font-medium">
                    {card.summary}
                  </p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-white/10 pt-4"
                      >
                        <p className="text-white/60 font-sans text-sm leading-relaxed">
                          {card.fullText}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Grid watermark inside expanded view */}
                {isExpanded && (
                  <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                    <Terminal className="w-32 h-32 text-white" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Highlights Section */}
        <div className="mt-16">
          <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-neon-purple" />
            <span>Professional Strengths & Focus Highlights</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESUME_DATA.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex gap-3 group"
              >
                <div className="mt-0.5">
                  <CheckCircle className="w-4 h-4 text-neon-blue group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-neon-blue transition-colors">
                    {highlight.title}
                  </h4>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
