import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Terminal, Cpu } from "lucide-react";

interface LoaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const logs = [
    "INITIALIZING SEC_CORE INTERFACE...",
    "ACQUIRING PONMALAR_S DOSSIER FILE...",
    "DECODING CYBERSECURITY SKILLS INVENTORY...",
    "VALIDATING CERTIFICATE SHIELDS...",
    "ESTABLISHING HOST CONTEXT...",
    "PORTFOLIO DECRYPTED. STAND BY..."
  ];

  useEffect(() => {
    // Increment log statements progressively
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    // Dynamic progress bar loader
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#060606] flex flex-col items-center justify-center p-6">
      {/* Background neon grid effect */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />

      <div className="w-full max-w-md space-y-8 relative z-10 text-center">
        {/* Animated Cyber Badge */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-neutral-900 border border-white/5 mx-auto p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue to-neon-purple opacity-30 animate-pulse rounded-2xl blur-md" />
          <div className="w-full h-full bg-[#0E0E0E] rounded-2xl flex items-center justify-center border border-white/10">
            <Shield className="w-9 h-9 text-neon-blue animate-pulse" />
          </div>
        </div>

        {/* Console logs */}
        <div className="bg-black/85 border border-white/5 rounded-xl p-5 text-left font-mono text-xs text-white/70 min-h-[140px] space-y-2 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-3 text-[10px] text-white/40">
            <Terminal className="w-3.5 h-3.5 text-neon-blue" />
            <span>PORT_3000 // SECURE_PORT_STAGING</span>
          </div>

          <div className="space-y-1">
            {logs.slice(0, logIndex + 1).map((log, index) => {
              const isLatest = index === logIndex;
              return (
                <div key={index} className={`flex items-start gap-1.5 ${isLatest ? "text-neon-blue" : "text-white/40"}`}>
                  <span className="select-none text-neon-purple">&gt;</span>
                  <span>{log}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Bar & percentage */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono text-white/50">
            <span>SECURE_BOOT_STAGING</span>
            <span className="text-neon-blue font-bold">{Math.min(progress, 100)}%</span>
          </div>

          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue via-sky-400 to-neon-purple"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
