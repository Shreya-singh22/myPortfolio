// Single source of truth for all portfolio copy and data.
// Update this file to change site content — layout components read from here only.

export const profile = {
  name: "Shreya Singh",
  initials: "SS",
  role: "Full Stack Developer",
  tagline: "Building AI-powered & real-time products",
  location: "Greater Noida, India",
  email: "chauhanshreyasingh94@gmail.com",
  phone: "+91-8177013032",
  links: {
    linkedin: "https://www.linkedin.com/in/shreya-chauhan-1026b9278",
    github: "https://github.com/Shreya-singh22",
  },
  resumeHref: "/resume/Shreya-Singh-Resume.pdf",
  languagesSpoken: ["English", "Hindi", "German"],
  bio: [
    "I'm a CS undergrad who ships real, deployed full-stack products — not tutorial clones sitting in a repo. Every project below is live, has real users, and taught me something a course never could.",
    "I care about the details most people skip: read receipts that actually sync, an LLM's hallucinated line numbers caught before they reach a pull request, inference that runs in under 100ms. That's where the engineering actually happens.",
    `Outside of code, I speak ${["English", "Hindi", "German"].join(", ")}, and I'm usually the one organizing the event rather than just attending it.`,
  ],
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    category: "Programming",
    items: ["Java", "Python", "C++", "JavaScript", "Rust"],
  },
  {
    category: "Frameworks",
    items: ["Node.js", "Next.js", "React", "Tailwind CSS"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "IntelliJ IDEA", "VS Code"],
  },
  {
    category: "Databases",
    items: ["Firebase", "MongoDB"],
  },
  {
    category: "Core CS",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"],
  },
  {
    category: "Other",
    items: ["UI/UX Design", "Agile Methodologies", "Cloud Computing"],
  },
];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  impact?: string[];
  tags: string[];
  liveHref: string;
  githubHref: string;
  featured?: boolean;
  /** Screenshot of the live, logged-in product — lives in public/projects/. */
  image: string;
  /** Domain shown in the card's browser-chrome bar. */
  domain: string;
  /** Two-stop accent gradient drawn from the product's own brand palette. */
  accent: [string, string];
};

export const projects: Project[] = [
  {
    slug: "you-matter-now",
    name: "You Matter Now",
    summary: "A mental health platform with an empathetic AI chatbot.",
    description:
      "A safe-space platform featuring a 24/7 empathetic chatbot built on the Gemini API and LangChain, personalized self-assessments, doctor discovery via geolocation and ratings, and private journaling.",
    impact: [
      "1,000+ monthly users",
      "85% self-assessment satisfaction",
      "+30% successful doctor bookings",
    ],
    tags: ["AI/LLM integration", "Healthcare UX", "Full-stack"],
    liveHref: "https://you-matter-games-journal-main.vercel.app/",
    githubHref: "https://github.com/Shreya-singh22/you-matter-now",
    featured: true,
    image: "/projects/you-matter-now.png",
    domain: "you-matter-games-journal-main.vercel.app",
    accent: ["#a78bfa", "#fb7185"],
  },
  {
    slug: "sign-language-translator",
    name: "AI-Based Sign Language Translator",
    summary:
      "Real-time American Sign Language detection in the browser via webcam.",
    description:
      "Uses MediaPipe Hands for landmark extraction and a trained classifier (CNN / Random Forest) to map hand landmarks to letters (A–Z, Nothing, Space), with live webcam inference running client-side.",
    impact: ["92% recognition accuracy", "<100ms inference latency"],
    tags: ["Computer Vision", "ML", "MediaPipe", "Real-time inference"],
    liveHref: "https://sign-lang-ai.onrender.com",
    githubHref: "https://github.com/Shreya-singh22/sign-lang-detector-",
    featured: true,
    image: "/projects/sign-language-translator.png",
    domain: "sign-lang-ai.onrender.com",
    accent: ["#22d3ee", "#6366f1"],
  },
  {
    slug: "signal-clone",
    name: "Signal Clone",
    summary:
      "A full-stack clone of the Signal Messenger with real-time 1:1 and group messaging.",
    description:
      "Registration and onboarding, conversation lists, real-time 1:1 and group messaging, typing indicators, delivery/read receipts, reactions, replies, attachments, stickers/GIFs, disappearing messages, and a light/dark themed UI.",
    tags: ["Real-time", "WebSockets", "Full-stack", "Messaging UX"],
    liveHref: "https://signal-clone-drab.vercel.app/",
    githubHref: "https://github.com/Shreya-singh22/Signal-clone",
    featured: true,
    image: "/projects/signal-clone.png",
    domain: "signal-clone-drab.vercel.app",
    accent: ["#60a5fa", "#2563eb"],
  },
  {
    slug: "ai-pr-reviewer",
    name: "AI PR Reviewer",
    summary:
      "A GitHub App that reviews every pull request automatically, in inline comments.",
    description:
      "Install it on a repo and each PR fires a webhook that enqueues a job on a durable Postgres-backed queue. A worker claims it, sends the diff to Groq (Llama 3.3), validates the structured findings with zod, cross-checks each one against the real diff hunks so a hallucinated line number gets dropped instead of breaking the review, then posts the survivors as inline PR comments. A dashboard tracks review history and findings by severity across every enabled repo.",
    impact: [
      "Reviews open/updated PRs with no human in the loop",
      "Durable queue via SELECT … FOR UPDATE SKIP LOCKED — no Redis",
      "Hallucinated findings dropped before they reach GitHub",
    ],
    tags: ["AI/LLM integration", "GitHub App", "Job queues", "Backend architecture"],
    liveHref: "https://code-review-assistant-bwf8.onrender.com",
    githubHref: "https://github.com/Shreya-singh22/Code-review-assistant",
    featured: true,
    image: "/projects/ai-pr-reviewer.png",
    domain: "code-review-assistant-bwf8.onrender.com",
    accent: ["#f97316", "#8b5cf6"],
  },
];

export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  kind: "work" | "leadership";
};

export const experience: ExperienceItem[] = [
  {
    organization: "Evoc Labs",
    role: "Full Stack Developer Intern",
    period: "Jan 2026 – May 2026",
    location: "India",
    kind: "work",
    bullets: [
      "Built responsive applications in React.js/TypeScript, improving load performance and UX.",
      "Built reusable UI components, cutting development time by 30%.",
      "Shipped 10+ production-ready features in collaboration with backend and design teams.",
    ],
  },
  {
    organization: "CodeChef BU",
    role: "Member",
    period: "Greater Noida",
    location: "Greater Noida",
    kind: "leadership",
    bullets: [
      "Organized 10+ technical events.",
      "Coordinated cross-functional teams to run events end to end.",
    ],
  },
  {
    organization: "Career Advancement Club",
    role: "Member",
    period: "Greater Noida",
    location: "Greater Noida",
    kind: "leadership",
    bullets: ["Conducted 5+ workshops with industry professionals."],
  },
  {
    organization: "Zenevia Tech Fest",
    role: "Social Media Head · Member · Volunteer",
    period: "Feb 2024 – Feb 2025",
    location: "Greater Noida",
    kind: "leadership",
    bullets: [
      "Social Media Head (May 2024 – Feb 2025), Member (May 2024 – Present), Volunteer (Feb 2024).",
      "Grew social engagement by 60%.",
    ],
  },
];

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    institution: "Bennett University, Greater Noida",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2023 – 2027",
    detail: "CGPA 8.97",
  },
  {
    institution: "City Montessori School, Lucknow",
    degree: "Class XII",
    period: "",
    detail: "96.7%",
  },
  {
    institution: "City Montessori School, Lucknow",
    degree: "Class X",
    period: "",
    detail: "91.6%",
  },
];

export type Certification = {
  name: string;
  issuer: string;
};

export const certifications: Certification[] = [
  { name: "Data Structures", issuer: "UC San Diego (Coursera)" },
  {
    name: "Getting Started with Accelerated Computing in Modern CUDA C++",
    issuer: "NVIDIA",
  },
  { name: "Docker for the Absolute Beginner", issuer: "Udemy" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
