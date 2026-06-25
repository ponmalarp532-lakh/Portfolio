import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, ExternalLink, Code, Server, X, Check, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { RESUME_DATA, Project } from "../types";

export default function Projects({ activeSection }: { activeSection?: string }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"All" | "Deployed" | "In Progress">("All");
  const isActive = activeSection === "projects";

  const projects = RESUME_DATA.projects;

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.status === filter;
  });

  return (
    <section
      id="projects"
      className="relative py-24 bg-dark-bg border-t border-white/5"
    >
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-12">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-blue drop-shadow-[0_0_8px_#00F0FF]" : "text-neon-blue/85"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-blue ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Cyber Lab Depository</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "text-white"
          }`}>
            Security & <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Web Projects</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            A selective compilation of deployed web platforms and diagnostic tools, emphasizing clean code architectures and strict client security hygiene.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {["All", "Deployed", "In Progress"].map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                id={`project-filter-${cat.replace(" ", "-").toLowerCase()}`}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  isActive
                    ? "border-neon-blue bg-neon-blue/10 text-neon-blue shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                    : "border-white/5 bg-white/[0.01] text-white/50 hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isInProgress = project.status === "In Progress";
            return (
              <motion.div
                key={project.id}
                layoutId={`project-container-${project.id}`}
                id={`project-card-${project.id}`}
                onClick={() => setSelectedProject(project)}
                className="interactive-card glass-panel rounded-2xl p-6 cursor-pointer border border-white/5 hover:border-neon-blue/20 bg-neutral-900/10 hover:bg-neutral-900/20 transition-all flex flex-col justify-between group relative overflow-hidden"
                whileHover={{ y: -5, scale: 1.01 }}
              >
                {/* Visual Cyber Graphic inside Card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
                      CODE_SEC // {project.id.toUpperCase()}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-semibold uppercase tracking-wider ${
                      isInProgress
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                        : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-white/60 font-sans leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] font-mono text-white/30 px-1.5 py-0.5">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-neon-blue group-hover:translate-x-1 transition-transform duration-300">
                    <span>Inspect dossiers</span>
                    <ArrowRight className="w-4 h-4 text-neon-blue" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backing blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              />

              {/* Modal Box */}
              <motion.div
                layoutId={`project-container-${selectedProject.id}`}
                id="project-modal"
                className="relative bg-[#0E0E0E] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
              >
                {/* Header Banner Graphic */}
                <div className="h-1.5 bg-gradient-to-r from-neon-blue via-sky-500 to-neon-purple" />

                {/* Close Button */}
                <button
                  id="project-modal-close"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content Box */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-neon-blue uppercase tracking-widest mb-2">
                      <Shield className="w-4 h-4 text-neon-blue" />
                      <span>Security Inspection Report</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {selectedProject.title}
                    </h3>

                    {/* URL link if deployed */}
                    {selectedProject.url && (
                      <a
                        id={`project-modal-link-${selectedProject.id}`}
                        href={selectedProject.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-neon-blue hover:underline mt-2 bg-neon-blue/5 border border-neon-blue/20 px-3 py-1 rounded-full"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit: {selectedProject.url}</span>
                      </a>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-5">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Operational Objective
                    </h4>
                    <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Bullet points mapping project highlights */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">
                      Technical Accomplishments
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-white/60">
                          <Check className="w-4.5 h-4.5 text-neon-purple shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Tech Stack */}
                  <div className="border-t border-white/5 pt-5">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider mb-2">
                      Secured Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer status validation stamp */}
                <div className="bg-neutral-900/50 px-6 py-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-white/40">
                    <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
                    <span>Dossier verified: Ponmalar S - 2026</span>
                  </div>

                  {selectedProject.url ? (
                    <a
                      id="modal-visit-button"
                      href={selectedProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-neon-blue text-black font-display text-xs font-bold hover:bg-cyan-400 transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                    >
                      <span>Launch App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Code is private</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
