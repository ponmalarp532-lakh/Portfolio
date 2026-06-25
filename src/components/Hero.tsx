import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { Shield, ArrowDown, Upload, Terminal, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RESUME_DATA } from "../types";

export default function Hero({ activeSection }: { activeSection?: string }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const titles = [
    "Cybersecurity Specialist",
    "Vulnerability Assessor",
    "Web Security Researcher",
    "Full-Stack Developer"
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 1500;

  // Typing effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = titles[titleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  // Load avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("portfolio_avatar");
    if (savedAvatar) {
      setProfileImage(savedAvatar);
    }
  }, []);

  // Handle avatar upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem("portfolio_avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleScrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden glow-bg cyber-grid"
    >
      {/* Laser / Grid scan line */}
      <div className="absolute inset-x-0 top-0 h-[2px] scanner-line pointer-events-none" />

      {/* Futuristic Background Accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-mono tracking-widest uppercase mb-6 self-start"
            >
              <Cpu className="w-3.5 h-3.5 animate-spin-slow text-neon-blue" />
              <span>Security System Active</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight"
            >
              Hi, I'm <span className="bg-gradient-to-r from-neon-blue via-sky-300 to-neon-purple bg-clip-text text-transparent">Ponmalar S</span>
            </motion.h1>

            {/* Dynamic Typing Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-10 sm:h-12 flex items-center mt-3"
            >
              <span className="text-xl sm:text-2xl font-mono text-neon-blue font-semibold">
                &gt; {currentText}
                <span className="animate-pulse font-bold text-neon-purple">|</span>
              </span>
            </motion.div>

            {/* Resume Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed font-sans max-w-xl"
            >
              {RESUME_DATA.summary}
            </motion.p>

            {/* Quick Badges based on resume titles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mt-6 font-mono text-xs text-white/50"
            >
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 hover:border-neon-blue/30 transition-colors">
                #Vulnerability-Assessment
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-colors">
                #Web-Security
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 hover:border-neon-blue/30 transition-colors">
                #Ethical-Hacking
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                id="hero-cta-projects"
                onClick={handleScrollToProjects}
                className="relative px-6 py-3 rounded-lg font-display text-sm font-semibold tracking-wide text-black bg-neon-blue hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer"
              >
                Inspect Portfolio
              </button>
              <a
                id="hero-cta-contact"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-lg font-display text-sm font-semibold tracking-wide text-white bg-transparent border border-white/10 hover:border-neon-purple/50 hover:bg-neon-purple/5 transition-all cursor-pointer"
              >
                Contact Agent
              </a>
            </motion.div>
          </div>

          {/* Cyberpunk Portrait Frame / Upload Center */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-72 h-72 sm:w-85 sm:h-85"
            >
              {/* Spinning Hexagon Outer Ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-neon-blue via-transparent to-neon-purple opacity-40 animate-spin-slow blur-md" />

              {/* Hexagonal Outer Frame border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-neon-blue via-slate-800 to-neon-purple p-[2px] shadow-2xl">
                <div className="w-full h-full bg-dark-bg rounded-3xl overflow-hidden relative group">
                  {/* Digital Overlay HUD */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
                    <span className="text-[10px] font-mono text-neon-blue tracking-widest leading-none">ID: PON_S2027</span>
                    <span className="text-[8px] font-mono text-white/40 leading-none">SYS_LEVEL: ACTIVE</span>
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                    <Shield className="w-6 h-6 text-neon-purple/50 animate-pulse" />
                  </div>

                  {/* Profile Image View */}
                  <div className="w-full h-full flex flex-col items-center justify-center relative">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Ponmalar S Avatar"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      /* High Tech Fallback Graphic */
                      <div className="w-full h-full bg-neutral-900/40 flex flex-col items-center justify-center p-6 text-center">
                        <div className="relative mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-neon-blue/10 border border-neon-blue/30">
                          <Terminal className="w-8 h-8 text-neon-blue animate-pulse" />
                          <div className="absolute inset-0 rounded-full bg-neon-blue/20 blur-sm animate-ping" />
                        </div>
                        <h3 className="font-display font-bold text-white text-sm">SECURITY PROFILE PROFILE_PICTURE</h3>
                        <p className="text-xs text-white/50 mt-1 font-mono max-w-[200px]">Click to upload profile image or drag file here</p>
                      </div>
                    )}

                    {/* Laser Scanner Effect Layer */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent h-1/2 w-full animate-pulse pointer-events-none border-b border-neon-blue/20" />

                    {/* Interactive Upload Button Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer z-30" onClick={triggerUpload}>
                      <div className="p-3 rounded-full bg-neon-blue/20 border border-neon-blue text-neon-blue">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-white uppercase tracking-wider">
                        {profileImage ? "Update Identity File" : "Upload Identity File"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Label Holder */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dark-bg border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-mono text-neon-blue tracking-widest whitespace-nowrap shadow-md">
                SEC_STAMP: <span className="text-white">APPROVED_2026</span>
              </div>

              {/* Invisible File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
          <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest">Scroll to scan</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-neon-blue" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
