import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Network, Code, Terminal, Server, Cpu, Check, Info } from "lucide-react";
import { RESUME_DATA } from "../types";

export default function Skills({ activeSection }: { activeSection?: string }) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);
  const isActive = activeSection === "skills";

  const categories = RESUME_DATA.skills;
  const activeCategory = categories[selectedCategoryIndex];
  const activeSkill = activeCategory.skills[selectedSkillIndex] || activeCategory.skills[0];

  // Map category strings to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="w-5 h-5 text-neon-blue" />;
      case "Network":
        return <Network className="w-5 h-5 text-neon-blue" />;
      case "Code":
        return <Code className="w-5 h-5 text-neon-blue" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-neon-blue" />;
      default:
        return <Cpu className="w-5 h-5 text-neon-blue" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative py-24 bg-dark-bg border-t border-white/5"
    >
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-neon-blue/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-purple drop-shadow-[0_0_8px_#BD00FF]" : "text-neon-purple/85"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-purple ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Operational Capabilities</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(189,0,255,0.4)]" : "text-white"
          }`}>
            Technical <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Skills Inventory</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            A comprehensive matrix of technical domains ranging from defensive cybersecurity protocols to low-level network packets investigation, full-stack programming, and core security tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Category Selectors */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono uppercase text-white/40 tracking-wider mb-2 ml-1">
              Select Tech Domain
            </h3>
            {categories.map((category, idx) => {
              const isActive = selectedCategoryIndex === idx;
              return (
                <button
                  key={idx}
                  id={`skill-cat-${idx}`}
                  onClick={() => {
                    setSelectedCategoryIndex(idx);
                    setSelectedSkillIndex(0); // reset selected skill
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? "border-neon-blue bg-neon-blue/5 shadow-[0_0_15px_rgba(0,240,255,0.05)]"
                      : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? "bg-neon-blue/10" : "bg-white/5"
                    }`}>
                      {getIcon(category.iconName)}
                    </div>
                    <div>
                      <span className={`text-sm font-display font-semibold block transition-colors ${
                        isActive ? "text-neon-blue" : "text-white/80 group-hover:text-white"
                      }`}>
                        {category.title}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {category.skills.length} core profiles
                      </span>
                    </div>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isActive ? "bg-neon-blue scale-125" : "bg-transparent"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Middle Column: Skills Grid within the Active Category */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase text-white/40 tracking-wider mb-2 ml-1">
              {activeCategory.title} Matrix
            </h3>
            <div className="space-y-2.5">
              {activeCategory.skills.map((skill, idx) => {
                const isActive = selectedSkillIndex === idx;
                return (
                  <div
                    key={idx}
                    id={`skill-item-${idx}`}
                    onClick={() => setSelectedSkillIndex(idx)}
                    className={`interactive-card p-4 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? "border-neon-purple/40 bg-neon-purple/5"
                        : "border-white/5 bg-white/[0.01] hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-mono font-medium ${
                        isActive ? "text-neon-purple" : "text-white/90"
                      }`}>
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-white/50">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Skill Description Panel */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-mono uppercase text-white/40 tracking-wider mb-2 ml-1">
              Active Skill Dossier
            </h3>
            <AnimatePresence mode="wait">
              {activeSkill && (
                <motion.div
                  key={`${selectedCategoryIndex}-${selectedSkillIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden h-full min-h-[280px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-neon-blue uppercase tracking-widest">
                        SEC_LOG // SPEC_DATA
                      </span>
                      <h4 className="text-lg font-display font-bold text-white mt-1">
                        {activeSkill.name}
                      </h4>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-neon-blue/10 border border-neon-blue/20 text-[10px] font-mono text-neon-blue">
                      LVL {activeSkill.level}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-mono text-white/40 block mb-1 uppercase tracking-wider">
                        Operational description
                      </span>
                      <p className="text-sm text-white/70 font-sans leading-relaxed">
                        {activeSkill.description}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <span className="text-xs font-mono text-white/40 block mb-2 uppercase tracking-wider">
                        Integrates with Projects
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {RESUME_DATA.projects
                          .filter(p =>
                            p.technologies.some(tech =>
                              skillMatchesTech(activeSkill.name, tech)
                            )
                          )
                          .map((project, pIdx) => (
                            <span
                              key={pIdx}
                              className="text-[10px] font-mono text-neon-purple bg-neon-purple/5 border border-neon-purple/20 px-2 py-0.5 rounded"
                            >
                              {project.title}
                            </span>
                          ))}
                        {RESUME_DATA.projects.filter(p =>
                          p.technologies.some(tech =>
                            skillMatchesTech(activeSkill.name, tech)
                          )
                        ).length === 0 && (
                          <span className="text-[10px] font-mono text-white/30 italic">
                            Used broadly in cyber lab research, standard local scripting environments & course exams.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex items-center gap-2 text-white/40 text-xs font-mono">
                      <Info className="w-4.5 h-4.5 text-neon-blue" />
                      <span>Security audit: verified functional capability</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple matching helper to dynamically connect skills to projects
function skillMatchesTech(skillName: string, techName: string): boolean {
  const normalizedSkill = skillName.toLowerCase();
  const normalizedTech = techName.toLowerCase();

  return (
    normalizedSkill.includes(normalizedTech) ||
    normalizedTech.includes(normalizedSkill) ||
    (normalizedSkill.includes("python") && normalizedTech.includes("python")) ||
    (normalizedSkill.includes("supabase") && normalizedTech.includes("supabase")) ||
    (normalizedSkill.includes("html") && normalizedTech.includes("html")) ||
    (normalizedSkill.includes("git") && normalizedTech.includes("git")) ||
    (normalizedSkill.includes("javascript") && normalizedTech.includes("javascript"))
  );
}
