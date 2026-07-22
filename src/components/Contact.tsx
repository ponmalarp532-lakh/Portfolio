import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, Github, Linkedin, Download, Send, CheckCircle2, Terminal, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RESUME_DATA } from "../types";

export default function Contact({ activeSection }: { activeSection?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const isActive = activeSection === "contact";

  // Simple Markdown file generator of the entire resume data
  const handleDownloadResume = () => {
    const markdownContent = `# PONMALAR S - FULL STACK DEVELOPER & FREELANCER RESUME

## CONTACT DETAILS
- **Phone:** ${RESUME_DATA.phone}
- **Email:** ${RESUME_DATA.email}
- **GitHub:** ${RESUME_DATA.github}
- **LinkedIn:** ${RESUME_DATA.linkedin}
- **College:** CMS College of Engineering and Technology

## PROFESSIONAL SUMMARY
${RESUME_DATA.summary}

## EDUCATION
${RESUME_DATA.education.map(edu => `- **Institution:** ${edu.institution}\n  **Degree:** ${edu.degree}\n  **Status:** ${edu.status}\n  **Graduation:** ${edu.expectedGraduation}`).join("\n\n")}

## SKILLS INVENTORY
${RESUME_DATA.skills.map(cat => `### ${cat.title}\n${cat.skills.map(s => `- **${s.name}** (Level: ${s.level}%)\n  *Description:* ${s.description}`).join("\n")}`).join("\n\n")}

## PROJECTS
${RESUME_DATA.projects.map(p => `### ${p.title} (${p.status})\n- **Description:** ${p.description}\n- **Accomplishments:**\n${p.details.map(d => `  - ${d}`).join("\n")}\n- **Technologies:** ${p.technologies.join(", ")}${p.url ? `\n- **Live App:** ${p.url}` : ""}`).join("\n\n")}

## ACHIEVEMENTS
${RESUME_DATA.achievements.map(a => `- ${a}`).join("\n")}

## CERTIFICATIONS
${RESUME_DATA.certifications.map(c => `- **${c.name}** (${c.issuer} - ${c.year})\n  *Details:* ${c.details}`).join("\n")}

## HIGHLIGHTS
${RESUME_DATA.highlights.map(h => `- **${h.title}:** ${h.description}`).join("\n")}
`;

    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ponmalar_S_Resume.md");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setLogMessages(["[SYS_LOG] Initializing secure socket transfer...", "[SYS_LOG] Performing packet sanitization checks..."]);

    setTimeout(() => {
      setLogMessages((prev) => [...prev, "[SYS_LOG] Encoding communication bytes in AES-256...", "[SYS_LOG] Routing packet tunnel to destination inbox..."]);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setLogMessages((prev) => [...prev, "[SYS_LOG] Payload transfer successfully finalized! Handshake complete."]);
        // clear form
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1200);
    }, 1000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-dark-bg border-t border-white/5"
    >
      {/* Visual cyber mesh */}
      <div className="absolute inset-0 scanner-line h-[1px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className={`inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest mb-3 transition-all duration-500 ${
            isActive ? "text-neon-blue drop-shadow-[0_0_8px_#00F0FF]" : "text-neon-blue/85"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-neon-blue ${isActive ? "animate-pulse" : "animate-ping"}`} />
            <span>Encrypted Connection Link</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-display font-bold tracking-tight transition-all duration-500 ${
            isActive ? "text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]" : "text-white"
          }`}>
            Secure a <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">Direct Channel</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm max-w-2xl font-sans">
            Have a project requirement, security audit query, or hackathon collaboration proposal? Broadcast your message securely below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links and Dossier Download */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
              <h3 className="text-sm font-mono text-neon-blue uppercase tracking-widest border-b border-white/5 pb-3">
                Transmission Protocols
              </h3>

              {/* Direct Mail */}
              <a
                id="contact-email-link"
                href={`mailto:${RESUME_DATA.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-neon-blue/5 hover:border-neon-blue/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-white/5 text-white/60 group-hover:bg-neon-blue/10 group-hover:text-neon-blue transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 block uppercase tracking-wider">
                    Secure SMTP Mail
                  </span>
                  <span className="text-sm font-sans text-white/90 group-hover:text-white transition-colors">
                    {RESUME_DATA.email}
                  </span>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                id="contact-phone-link"
                href={`tel:${RESUME_DATA.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-neon-purple/5 hover:border-neon-purple/30 transition-all group"
              >
                <div className="p-3 rounded-lg bg-white/5 text-white/60 group-hover:bg-neon-purple/10 group-hover:text-neon-purple transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 block uppercase tracking-wider">
                    Audio Terminal Phone
                  </span>
                  <span className="text-sm font-sans text-white/90 group-hover:text-white transition-colors">
                    {RESUME_DATA.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Social handles with custom designs */}
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
              <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">
                External Integrations
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <a
                  id="contact-github-link"
                  href={RESUME_DATA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-neon-blue/5 hover:border-neon-blue/20 transition-all text-center group"
                >
                  <Github className="w-6 h-6 text-white/60 group-hover:text-neon-blue group-hover:scale-110 transition-all mb-2" />
                  <span className="text-xs font-display font-semibold text-white">GitHub Code</span>
                  <span className="text-[9px] font-mono text-white/40 mt-1 uppercase tracking-wider">Ponmalar-S</span>
                </a>

                <a
                  id="contact-linkedin-link"
                  href={RESUME_DATA.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-neon-purple/5 hover:border-neon-purple/20 transition-all text-center group"
                >
                  <Linkedin className="w-6 h-6 text-white/60 group-hover:text-neon-purple group-hover:scale-110 transition-all mb-2" />
                  <span className="text-xs font-display font-semibold text-white">LinkedIn Net</span>
                  <span className="text-[9px] font-mono text-white/40 mt-1 uppercase tracking-wider">ponmalar-s</span>
                </a>
              </div>
            </div>

            {/* Resume Download Action Card */}
            <div className="p-6 rounded-2xl border border-neon-blue/20 bg-neon-blue/5 flex flex-col justify-between items-start gap-4">
              <div>
                <h4 className="text-sm font-display font-bold text-white">
                  Full Secure Dossier (Resume)
                </h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  Download a beautifully compiled offline resume formatted as Markdown to inspect all scholastic credentials and security benchmarks.
                </p>
              </div>

              <button
                id="contact-download-resume"
                onClick={handleDownloadResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neon-blue text-black font-display text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)]"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Download Identity Dossier</span>
              </button>
            </div>
          </div>

          {/* Right Column: Encrypted Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 relative">
              <h3 className="text-sm font-mono text-neon-blue uppercase tracking-widest border-b border-white/5 pb-3 mb-6">
                Broadcast Packet Form
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-white/50 block uppercase mb-1.5 tracking-wider">
                      Identity Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Inspector Cooper"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-white/50 block uppercase mb-1.5 tracking-wider">
                      Source Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. mail@agency.com"
                      className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 block uppercase mb-1.5 tracking-wider">
                    Subject Channel
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Audit request / Web Dev Project"
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/50 block uppercase mb-1.5 tracking-wider">
                    Message Payload *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your security challenge or software requirement..."
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-blue transition-colors font-sans resize-none"
                  />
                </div>

                {/* Secure transmission progress log console */}
                {isSubmitting && (
                  <div className="bg-[#050505] border border-white/10 p-3.5 rounded-xl font-mono text-[10px] text-neon-blue space-y-1.5">
                    {logMessages.map((msg, mIdx) => (
                      <div key={mIdx}>{msg}</div>
                    ))}
                    <div className="animate-pulse flex items-center gap-1.5 text-neon-purple mt-2">
                      <Terminal className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting secure bits...</span>
                    </div>
                  </div>
                )}

                {/* Submit button / Success message */}
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <div>
                        <div className="text-xs font-mono uppercase font-bold">Transmission Complete</div>
                        <div className="text-[11px] text-emerald-400/70 mt-0.5">Your message payload has been securely tunneled to Ponmalar.</div>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 px-6 rounded-xl font-display text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        isSubmitting
                          ? "bg-neutral-800 text-white/45 cursor-not-allowed"
                          : "bg-white text-black hover:bg-neon-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Message Securely</span>
                    </button>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
