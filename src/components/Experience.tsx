import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Code, Trophy, Terminal, Briefcase, Plus, Minus, Cpu } from "lucide-react";
import { RESUME_DATA } from "../types";

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  tag: string;
  summary: string;
  details: string[];
  icon: any;
}

export default function Experience({ activeSection }: { activeSection?: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First card open by default
  const isActive = activeSection === "experience";

  const experienceItems: ExperienceItem[] = [
    {
      role: "Hackathon Competitor & Lead Developer",
      organization: "Rapid Prototyping Events & Tech Fests",
      period: "2025 - Present",
      tag: "INNOVATION",
      summary: "Winner of multiple high-profile Hackathon competitions. Collaborated in fast-paced teams to build highly secure software MVPs.",
      details: [
        "Led front-end and full-stack development, transitioning conceptual wireframes to fully hosted web apps in under 36 hours.",
        "Engineered reliable database bindings and state structures, prioritizing secure input sanitization and token defenses.",
        "Presented functional demos to jury panels, emphasizing user utility, performance optimization, and defensive system architectures."
      ],
      icon: Trophy
    },
    {
      role: "Full-Stack Web Application Deployer",
      organization: "Independent Software Lab & Production MVP releases",
      period: "2025 - Present",
      tag: "FULL-STACK DEVELOPMENT",
      summary: "Successfully built, secured, and deployed 6+ real-world web applications.",
      details: [
        "Crafted advanced platforms including ATS Resume Checker (React), Cyber WHOIS platform, and Temporary Email client.",
        "Integrated modern client-side technologies with secure database backends like Supabase and Vercel hosting portals.",
        "Configured custom domains, automated CI/CD deployment pipelines, and monitored live diagnostic health indicators."
      ],
      icon: Code
    },
    {
      role: "Vulnerability Assessor & Security Researcher",
      organization: "CMS College Academic Security Exploration",
      period: "2025 - Present",
      tag: "CYBERSECURITY",
      summary: "Actively studying vulnerability scanning, port mapping, and defensive security frameworks.",
      details: [
        "Conducted packet analysis research using Wireshark to understand raw HTTP/S, TCP, and DNS handshakes.",
        "Employed Nmap mapping scripts within sandbox labs to learn port discovery and operating system detection methods.",
        "Formulated security policy documents adhering to the CIA Triad (Confidentiality, Integrity, Availability) standards."
      ],
      icon: Shield
    }
  ];

  const handleToggle = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <section
      id="experience"
      className="relative py-24 bg-dark-bg border-t border-white/5"
    >
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-neon-blue/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-blue drop-shadow-[0_0_8px_#00F0FF]" : "text-neon-blue/85"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-blue ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Operational Log</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "text-white"
          }`}>
            Applied <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Experience</span> & Sprints
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            Detailing my practical history as an independent builder, hackathon champion, and dedicated security research programmer.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-4">
          {experienceItems.map((item, idx) => {
            const IconComponent = item.icon;
            const isExpanded = expandedIndex === idx;

            return (
              <motion.div
                key={idx}
                layout
                id={`exp-card-${idx}`}
                className={`interactive-card border rounded-2xl overflow-hidden transition-all duration-300 relative ${
                  isExpanded
                    ? "border-neon-purple bg-neon-purple/[0.02] shadow-[0_0_20px_rgba(157,0,255,0.06)]"
                    : "border-white/5 bg-white/[0.01] hover:border-white/10"
                }`}
              >
                <div
                  onClick={() => handleToggle(idx)}
                  className="p-6 cursor-pointer flex flex-wrap sm:flex-nowrap items-start justify-between gap-4 select-none"
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-xl shrink-0 transition-colors ${
                      isExpanded ? "bg-neon-purple/20 text-neon-purple" : "bg-white/5 text-white/50"
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-bold text-white text-base sm:text-lg">
                          {item.role}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/60">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neon-blue font-mono mt-1">
                        {item.organization}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs font-mono text-white/40">{item.period}</span>
                    <button className="p-1 rounded bg-white/5 text-white/50 hover:text-white transition-colors">
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-white/[0.03] pt-4 bg-neutral-900/10"
                    >
                      <p className="text-sm text-white/80 font-sans leading-relaxed mb-4">
                        {item.summary}
                      </p>

                      <div className="space-y-2">
                        {item.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                            <span className="text-neon-purple select-none mt-1.5 text-[10px]">♦</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
