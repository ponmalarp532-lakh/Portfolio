import { useState } from "react";
import { Award, Calendar, CheckCircle2, ChevronRight, BookOpen, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RESUME_DATA, Certification } from "../types";

export default function Certifications({ activeSection }: { activeSection?: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isActive = activeSection === "certifications";

  const certifications = RESUME_DATA.certifications;

  const handleToggle = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <section
      id="certifications"
      className="relative py-24 bg-dark-bg border-t border-white/5"
    >
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-purple drop-shadow-[0_0_8px_#BD00FF]" : "text-neon-purple/85"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-purple ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Verifiable Credentials</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(189,0,255,0.4)]" : "text-white"
          }`}>
            Certifications & <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Recognitions</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            Offical security acknowledgments, academic distinctions, and hackathon winner declarations verified by reputable academic and technical bodies.
          </p>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, idx) => {
            const isExpanded = expandedIndex === idx;
            const isToBeAdded = cert.year === "To Be Added";

            return (
              <motion.div
                key={idx}
                layout
                id={`cert-card-${idx}`}
                onClick={() => handleToggle(idx)}
                className={`interactive-card glass-panel rounded-2xl p-6 cursor-pointer border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isExpanded
                    ? "border-neon-blue/40 bg-neon-blue/[0.02] shadow-[0_0_20px_rgba(0,240,255,0.08)]"
                    : "border-white/5 bg-white/[0.01] hover:border-white/10"
                }`}
                whileHover={{ y: -3 }}
              >
                {/* Neon glow lines for aesthetic cyber frames */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${
                  isExpanded ? "via-neon-blue" : "via-white/10"
                } to-transparent`} />

                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        isExpanded ? "bg-neon-blue/10 text-neon-blue" : "bg-white/5 text-white/60"
                      }`}>
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white text-base group-hover:text-neon-blue transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-xs font-mono text-white/40 mt-1">
                          Issuer: {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded shrink-0 ${
                      isToBeAdded
                        ? "bg-neon-purple/10 border border-neon-purple/20 text-neon-purple animate-pulse"
                        : "bg-white/5 border border-white/10 text-white/70"
                    }`}>
                      {cert.year}
                    </span>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/5"
                      >
                        <p className="text-sm text-white/60 font-sans leading-relaxed">
                          {cert.details}
                        </p>

                        <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-neon-blue">
                          <CheckCircle2 className="w-4 h-4 text-neon-blue" />
                          <span>Status: Active & Authenticated</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {!isExpanded && (
                  <div className="mt-4 pt-3 border-t border-white/[0.03] flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>Inspect certification notes</span>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
