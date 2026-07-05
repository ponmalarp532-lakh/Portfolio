export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  url?: string;
  technologies: string[];
  status?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1-100 percentage
    description: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  expectedGraduation: string;
  status: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  details: string;
}

export interface HighlightItem {
  title: string;
  description: string;
}

export const RESUME_DATA = {
  name: "Anizaa",
  title: "Cybersecurity Analyst & Web Developer",
  summary: "Technology enthusiast with a proven track record of transforming ideas into deployed applications. Built and maintained multiple web-based solutions, participated in winning hackathon teams, and actively explores cybersecurity through hands-on security projects and research. Combining software engineering, problem-solving, and security-focused thinking to create reliable and secure digital solutions.",
  email: "anizaa@gmail.com",
  phone: "+91 93426 78360",
  github: "https://github.com/anizaa",
  linkedin: "https://linkedin.com/in/anizaa",
  education: [
    {
      institution: "CMS College of Engineering and Technology",
      degree: "B.Tech Information Technology (minours)",
      expectedGraduation: "Expected Graduation: 2027",
      status: "Current Status: Third Year — Sixth Semester"
    }
  ] as EducationItem[],
  skills: [
    {
      title: "Cybersecurity",
      iconName: "Shield",
      skills: [
        { name: "Cybersecurity Fundamentals", level: 90, description: "Understanding of security baselines, standard frameworks, and defense-in-depth principles." },
        { name: "CIA Triad", level: 95, description: "Deep knowledge of Confidentiality, Integrity, and Availability principles applied to design secure systems." },
        { name: "Threats, Vulnerabilities & Risks", level: 85, description: "Analyzing threat vectors, assessing risk factors, and performing vulnerability mapping." },
        { name: "Malware & Phishing Awareness", level: 85, description: "Understanding social engineering techniques, ransomware vectors, and phishing detection methods." },
        { name: "Basic Web Security Concepts", level: 80, description: "Familiarity with OWASP Top 10, cross-site scripting (XSS), SQL injection, and CSRF defense." }
      ]
    },
    {
      title: "Networking",
      iconName: "Network",
      skills: [
        { name: "OSI Model", level: 85, description: "Thorough understanding of the 7-layer architecture and protocol interactions at each layer." },
        { name: "TCP/IP Fundamentals", level: 85, description: "Comprehensive insight into IP routing, TCP handshake, sliding window, and packet delivery." },
        { name: "DNS, HTTP, HTTPS, FTP, SSH", level: 90, description: "Core internet protocol configurations, TLS handshakes, secure shell access, and file transfer mechanisms." },
        { name: "IPv4 Addressing", level: 80, description: "Subnetting, CIDR notation, and network class identification." }
      ]
    },
    {
      title: "Programming & Dev",
      iconName: "Code",
      skills: [
        { name: "Python Basics", level: 75, description: "Scripting, basic automation, data parsing, and cybersecurity tooling scripting." },
        { name: "HTML, CSS, JavaScript", level: 90, description: "Modern responsive web layouts, interactive interfaces, dynamic DOM operations, and ES6+ styling." },
        { name: "Git & GitHub", level: 85, description: "Version control workflows, branching, repository management, pulls/merges, and collaborative coding." },
        { name: "Supabase & Backend", level: 80, description: "Real-time databases, user authentication, security rules, and serverless backend storage integrations." },
        { name: "Vercel & Deployment", level: 85, description: "Continuous Integration & Deployment (CI/CD) pipelines, cloud hosting, domain setup, and monitoring." }
      ]
    },
    {
      title: "Security Tools & Linux",
      iconName: "Terminal",
      skills: [
        { name: "Wireshark (Learning)", level: 70, description: "Active research in packet capture analysis, decoding protocol fields, and network traffic sniffing." },
        { name: "Nmap (Learning)", level: 70, description: "Active research in network mapping, port scanning techniques, and vulnerability identification." },
        { name: "Linux Fundamentals", level: 80, description: "Navigating terminal command-line interface, permissions handling, process management, and scripting." }
      ]
    }
  ] as SkillCategory[],
  projects: [
    {
      id: "vuln-checker",
      title: "GitHub Repository Vulnerability Checker",
      description: "Developing a security tool to detect exposed API keys, secrets, credentials, and sensitive files in GitHub repositories.",
      details: [
        "Focuses on helping developers identify security risks before public exposure.",
        "Scans commits and files for hardcoded database strings, OAuth tokens, and secret parameters.",
        "Employs regex patterns and heuristic search to optimize security checks with minimal false positives."
      ],
      technologies: ["Python", "GitHub API", "Git CLI", "Security Regex", "JSON Reporting"],
      status: "In Progress"
    },
    {
      id: "cyber-whois",
      title: "Cyber WHOIS Tool",
      description: "Developed a web-based WHOIS lookup platform for retrieving domain registration information.",
      details: [
        "Simplifies access to domain ownership, Registrar information, creation/expiry dates, and name server records.",
        "Built with a sleek dark-themed visual interface for fast diagnostic checks.",
        "Helps security researchers quickly investigate domain registry backgrounds during threat assessments."
      ],
      url: "https://cyber-whois.vercel.app",
      technologies: ["JavaScript", "HTML5", "Tailwind CSS", "WHOIS API", "Vercel"],
      status: "Deployed"
    },
    {
      id: "ats-checker",
      title: "ATS Resume Checker",
      description: "Built an ATS-focused resume analysis platform to evaluate alignment against job descriptions.",
      details: [
        "Provides resume scoring based on key semantic requirements.",
        "Delivers comprehensive improvement suggestions, keyword density reports, and formatting checks.",
        "Equipped with a modern intuitive user interface with instant real-time scanning feedback."
      ],
      url: "https://atspro-two.vercel.app",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Text Analysis Algorithm", "Vercel"],
      status: "Deployed"
    },
    {
      id: "temp-email",
      title: "Temporary Email Application",
      description: "Developed a secure temporary email platform for testing, staging, and protecting personal inboxes.",
      details: [
        "Generates dynamic, disposable email mailboxes instantly.",
        "Protects user privacy and wards off spam campaigns, tracking cookies, and phishing attempts on main mailboxes.",
        "Ideal for QA testing, short-term web service registration, and developer debugging."
      ],
      url: "https://temp-mail-taupe.vercel.app",
      technologies: ["React", "API Integration", "Tailwind CSS", "Local Storage", "Vercel"],
      status: "Deployed"
    },
    {
      id: "blood-donor",
      title: "Blood Donor Collection System",
      description: "Designed and deployed a donor registration and management system optimized for college use.",
      details: [
        "Facilitates seamless donor profiling, blood group sorting, and emergency contact lists.",
        "Allows college admin panels to broadcast urgent requirements and secure response matching.",
        "Created a responsive, user-friendly portal emphasizing security of sensitive student contact logs."
      ],
      url: "https://blodd-donour.vercel.app",
      technologies: ["HTML5", "CSS3", "JavaScript", "Supabase", "Vercel"],
      status: "Deployed"
    }
  ] as Project[],
  achievements: [
    "Winner of multiple high-profile Hackathon competitions.",
    "Participated in various technology and innovation hackathons.",
    "Successfully built and deployed 6+ real-world web applications."
  ],
  certifications: [
    {
      name: "Hackathon Participation Certificates",
      issuer: "Various Technical Symposia",
      year: "2024 - 2026",
      details: "Earned for participating in rapid prototyping hackathons, implementing secure web architectures."
    },
    {
      name: "Hackathon Winner Certificates",
      issuer: "College Tech Fest",
      year: "2025",
      details: "Awarded top honors for designing functional multi-module software MVPs under intense time-limits."
    },
    {
      name: "Department Rank Holder Recognition",
      issuer: "CMS College of Engineering and Technology",
      year: "2025 - 2026",
      details: "Received academic distinction and top standing in core Information Technology curricula."
    },
    {
      name: "Additional Cybersecurity Certifications",
      issuer: "Undergoing Prep",
      year: "To Be Added",
      details: "Actively studying toward industry recognized cyber certifications to solidify vulnerability assessment skills."
    }
  ] as Certification[],
  highlights: [
    { title: "Security-Oriented Problem Solving", description: "Approaching standard development challenges with an active, defense-first mindset." },
    { title: "Rapid Prototyping & MVP Dev", description: "Transforming functional software requirements into responsive code products rapidly." },
    { title: "Full-Stack Deployment", description: "Deploying production-ready client layers with secure serverless databases and API gateways." },
    { title: "Independent Technical Research", description: "Deep diving into emerging threat frameworks, cybersecurity trends, and ethical hacking protocols." },
    { title: "Continuous Skill Development", description: "Remaining at the frontier of technology stacks through deliberate daily practice and cert prep." },
    { title: "Ethical Hacking Interest", description: "Fascinated by red-teaming, threat intelligence, security auditing, and web vulnerabilities assessment." }
  ] as HighlightItem[]
};
