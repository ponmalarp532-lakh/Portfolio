import { motion } from "motion/react";
import { BookOpen, Calendar, GraduationCap, Award, MapPin, Compass } from "lucide-react";
import { RESUME_DATA } from "../types";

export default function Education({ activeSection }: { activeSection?: string }) {
  const educationList = RESUME_DATA.education;
  const isActive = activeSection === "education";

  // Additional mock items representing key academic milestones to enrich the timeline!
  const educationalMilestones = [
    {
      type: "degree",
      title: "B.Tech Information Technology (minours)",
      institution: "CMS College of Engineering and Technology",
      period: "2023 - 2027",
      status: "Currently: Third Year — Sixth Semester",
      details: [
        "Rigorous coursework in cryptography basics, data transmission protocols, database administration, and system design.",
        "Maintained top standing in core Information Technology curricula, earning Department Rank recognition.",
        "Active leader in rapid prototype software assemblies and secure web architectures."
      ],
      location: "Coimbatore, India"
    },
    {
      type: "symposia",
      title: "Cybersecurity & Vulnerability Research",
      institution: "Independent Studies & Lab Exploration",
      period: "2026 - Present",
      status: "Active Exploration",
      details: [
        "Hands-on practice in capturing packets with Wireshark and analyzing vulnerabilities with Nmap.",
        "Deep research on standard threats, risk concepts, malware, and common web security vectors.",
        "Configuring serverless databases with robust client security rules (Supabase, Firebase)."
      ],
      location: "Remote Lab"
    }
  ];

  return (
    <section
      id="education"
      className="relative py-24 bg-dark-bg border-t border-white/5"
    >
      <div className="absolute top-1/4 right-10 w-80 h-80 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-blue drop-shadow-[0_0_8px_#00F0FF]" : "text-neon-blue/85"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-blue ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Academic Chronicles</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "text-white"
          }`}>
            Education & <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Milestones</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            Tracking educational history and self-directed cyber defense competencies in a responsive chronological layout.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
          {educationalMilestones.map((milestone, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot Icon */}
                <div className="absolute -left-[53px] md:-left-[69px] top-1.5 w-10 h-10 rounded-full bg-dark-bg border-2 border-white/10 group-hover:border-neon-blue transition-colors flex items-center justify-center z-10 shadow-lg">
                  {milestone.type === "degree" ? (
                    <GraduationCap className="w-5 h-5 text-neon-blue" />
                  ) : (
                    <Compass className="w-5 h-5 text-neon-purple" />
                  )}
                </div>

                {/* Main Card Content */}
                <div className="interactive-card glass-panel rounded-2xl p-6 border border-white/5 hover:border-neon-blue/20 bg-white/[0.01] hover:bg-white/[0.02] transition-all relative overflow-hidden">
                  {/* Subtle Corner Glow Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-neon-blue/10 transition-colors" />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-blue transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-sm font-sans text-white/70 font-medium mt-1">
                        {milestone.institution}
                      </p>
                    </div>

                    <div className="flex flex-col items-end text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/75">
                        <Calendar className="w-3.5 h-3.5 text-neon-purple" />
                        {milestone.period}
                      </span>
                      <span className="text-[10px] font-mono text-neon-blue mt-1.5 uppercase tracking-wider">
                        {milestone.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-2">
                    {milestone.details.map((detail, dIdx) => (
                      <p key={dIdx} className="text-sm text-white/50 leading-relaxed font-sans flex items-start gap-2">
                        <span className="text-neon-blue mt-1.5 select-none text-[10px]">■</span>
                        <span>{detail}</span>
                      </p>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-white/40 text-xs font-mono">
                    <MapPin className="w-4 h-4 text-neon-blue" />
                    <span>{milestone.location}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
