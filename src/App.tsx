import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section via a highly robust scroll listener
  useEffect(() => {
    if (loading) return;

    const sections = [
      "home",
      "about",
      "skills",
      "education",
      "projects",
      "certifications",
      "experience",
      "contact",
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // 1. Edge Case: At the top of the page
      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // 2. Edge Case: Near the bottom of the page
      const isAtBottom = viewportHeight + scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // 3. Middle Sections: Calculate which section is most prominent in the viewport
      let currentSection = "";
      let maxVisibleHeight = 0;

      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          
          // Calculate intersection of section with viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = visibleBottom - visibleTop;

          // If the element is visible in the viewport
          if (visibleHeight > 0) {
            // We favor the one with the maximum visible height inside the main viewing area
            if (visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight;
              currentSection = secId;
            }
          }
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Trigger on mount/after loading completes
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-dark-bg text-white overflow-x-hidden selection:bg-neon-blue/30 selection:text-white font-sans">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Custom Interactive Cursor overlay (Glow effect) */}
            <CustomCursor />

            {/* Sticky Header Navigation */}
            <Header activeSection={activeSection} />

            {/* Sections */}
            <main>
              <Hero activeSection={activeSection} />
              <About activeSection={activeSection} />
              <Skills activeSection={activeSection} />
              <Education activeSection={activeSection} />
              <Projects activeSection={activeSection} />
              <Certifications activeSection={activeSection} />
              <Experience activeSection={activeSection} />
              <Contact activeSection={activeSection} />
            </main>

            {/* Premium Futuristic Footer */}
            <footer className="border-t border-white/5 py-12 bg-[#050505] text-center font-mono text-xs text-white/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-6 text-[11px]">
                  <span>STATUS: <span className="text-neon-blue">ONLINE</span></span>
                  <span>ENCRYPTION: <span className="text-neon-purple">ACTIVE</span></span>
                  <span>LOC: <span className="text-white">COIMBATORE // IND</span></span>
                </div>
                <div className="text-white/30 text-[10px]">
                  © {new Date().getFullYear()} Ponmalar S. All rights reserved. Decoupled web stack.
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
