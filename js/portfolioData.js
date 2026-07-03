/**
 * Pure Vanilla JavaScript Portfolio Data Object for MUNTAHI - Chief of Developer
 */

window.PORTFOLIO_DATA = {
  personal: {
    name: "MUNTAHI",
    title: "Chief of Developer",
    organization: "Founder & Owner of GMS (GM's School)",
    location: "Global / Remote",
    availability: "Available for Software, AI & Game Engineering",
    bioShort: "Founder & Owner of GMS. Architecting local & generative AI engines, scalable full-stack applications, desktop automation suites, custom Minecraft plugins/mods, Roblox Lua games, and GMlib Python library.",
    bioLong: "I am Muntahi, Chief of Developer and Founder & Owner of GMS (GM's School). As a Full-Stack Software Engineer, AI Developer, Generative AI Engineer, Game Developer, 3D Modeler, Automation Engineer, Technical Educator, and Professional Chess Player, I construct software solutions driven by performance first, clean architecture, modern UI/UX, and continuous learning.",
    email: "smmuntahi@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    portraitImage: "public/me.self2.png",
    minecraftImage: "public/muntahi_minecraft.jpg",
    stats: {
      organizations: "2 Orgs",
      aiSystems: "5+ Systems",
      projectsCompleted: "100+",
      languagesCount: "10+ Langs",
      chessRating: "Pro Player"
    },
    roles: [
      "Founder & Owner of GMS (GM's School)",
      "Chief of Developer",
      "Full-Stack Software Engineer",
      "AI & Generative AI Engineer",
      "Game Developer (Godot, Roblox, Minecraft)",
      "UI/UX & Logo / Vector Designer",
      "3D Modeler (Blender & Blockbench)",
      "Automation Systems Engineer",
      "Technical Educator",
      "Professional Chess Player"
    ],
    expertise: [
      "Full Stack Development",
      "Artificial Intelligence",
      "Automation Systems",
      "Software Architecture",
      "API Development",
      "Desktop Applications",
      "Web Applications",
      "Performance Optimization",
      "SEO & Security",
      "Database Design",
      "System Design",
      "3D Graphics & Motion Design"
    ],
    philosophy: [
      { name: "Performance First", desc: "Sub-millisecond execution, minimal memory overhead, zero UI latency." },
      { name: "Clean Architecture", desc: "Modular, decoupled codebases built for high maintainability & clarity." },
      { name: "Modern UI/UX", desc: "Intuitive glassmorphism interfaces, smooth animations, and high contrast." },
      { name: "Scalability & Security", desc: "Hardened system design, encrypted communication, and SQL safety." },
      { name: "Continuous Learning", desc: "Pioneering frontier AI, vector models, and graphics engines." }
    ],
    achievements: [
      "Founder & Owner of two technology organizations (GMS & GMS Network)",
      "Creator of Deffin AI & Jarvis AI desktop assistant engines",
      "Creator & Lead Developer of GMlib open-source Python library",
      "Full-stack software developer across Python, C, C++, Java, JS, PHP, Lua & Batch",
      "Game developer across Godot Engine, Roblox Studio Lua, and Minecraft Plugins & Mods",
      "3D Modeler crafting custom assets in Blender and Blockbench",
      "Professional Chess Player applying strategic foresight to complex software architecture"
    ],
    tools: [
      "Visual Studio Code",
      "IntelliJ IDEA",
      "Blender",
      "Blockbench",
      "Git & GitHub",
      "Godot Engine",
      "Arduino IDE"
    ],
    interests: [
      "Artificial Intelligence",
      "Software Engineering",
      "Open Source",
      "Automation",
      "Game Development",
      "Chess Strategy",
      "Cyber Technology",
      "UI/UX Design",
      "3D Graphics"
    ]
  },

  projects: [
    {
      id: "deffin-ai",
      title: "DEFFIN AI",
      subtitle: "Advanced Generative AI & Intelligence Suite",
      category: "ai",
      description: "Cutting-edge local & cloud generative AI system featuring multi-modal context understanding, streaming token responses, and autonomous agent execution.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "Generative AI", "Local AI Systems", "REST APIs", "Flask"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
      caseStudy: {
        client: "GMS Ecosystem",
        role: "Chief AI Engineer & Architect",
        timeline: "Completed (2025)",
        overview: "Engineered Deffin AI as an advanced intelligence engine capable of offline inference, multi-modal reasoning, and workflow automation.",
        architecture: [
          "Streaming LLM token response pipeline with sub-50ms latency",
          "Local vector store index for private knowledge retreival",
          "Autonomous plugin runner executing local OS & web tasks"
        ],
        impact: "Powering automated AI workflows and smart assistance across GMS software products."
      }
    },
    {
      id: "jarvis-ai",
      title: "JARVIS AI ASSISTANT",
      subtitle: "Desktop AI Voice & Computer Automation System",
      category: "ai",
      description: "Voice-activated desktop assistant integrating real-time speech recognition, computer task execution, hardware telemetry monitoring, and smart macros.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "Voice Assistant", "Computer Automation", "Desktop AI", "Batch"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
      caseStudy: {
        client: "GMS Core Projects",
        role: "Lead Developer",
        timeline: "Completed (2025)",
        overview: "Jarvis AI binds offline voice control with OS-level batch execution, custom hotkeys, and automated software workflows.",
        architecture: [
          "Sub-100ms offline voice command recognition and intent parsing",
          "Multi-threaded process manager executing custom Batch & Python scripts",
          "Adaptive memory buffer preserving long-term user preferences"
        ],
        impact: "Automated over 85% of daily OS operations, application launches, and system configurations."
      }
    },
    {
      id: "advanced-file-manager",
      title: "ADVANCED FILE MANAGER",
      subtitle: "High-Performance Cross-Platform Desktop File Manager",
      category: "fullstack",
      description: "Speed-focused desktop file manager engineered with fast directory indexing, multi-threaded bulk operations, vector previews, and dark glassmorphism UI.",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "C++", "JavaScript", "System Architecture", "UI/UX"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
      caseStudy: {
        client: "Open Source / GMS",
        role: "Software Architect & UI Designer",
        timeline: "Completed (2024)",
        overview: "Built to replace heavy default file explorers with a hyper-fast, customizable file workspace supporting bulk renames and instant file search.",
        architecture: [
          "Memory-mapped filesystem indexing with C++ performance extensions",
          "3D Blockbench and code syntax preview generator built into UI",
          "Integrated file encryption, hash calculation, and batch zip tools"
        ],
        impact: "Searches 200,000+ files instantly with zero UI thread freezing."
      }
    },
    {
      id: "gmlib-python",
      title: "GMLIB (PYTHON LIBRARY)",
      subtitle: "Open Source Developer Framework for GMS",
      category: "automation",
      description: "Reusable Python library delivering helper modules, network protocols, automation abstractions, database connectors, and AI utilities.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "Open Source", "Package", "Library", "System Tools"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
      caseStudy: {
        client: "GMS Developer Ecosystem",
        role: "Creator & Lead Maintainer",
        timeline: "Active Project",
        overview: "Created by Muntahi to standardize Python codebases across GMS initiatives with high-efficiency utility modules.",
        architecture: [
          "Clean modular package structure with zero unnecessary external dependencies",
          "Integrated WhatsApp automation wrappers, JSON parsers & REST clients",
          "Comprehensive unit tests and automated build pipeline"
        ],
        impact: "Accelerated development speed across all GMS software projects by 3x."
      }
    },
    {
      id: "whatsapp-automation",
      title: "WHATSAPP AUTOMATION SYSTEM",
      subtitle: "Enterprise Client Messaging & Bot Engine",
      category: "automation",
      description: "Automated business messaging platform executing auto-replies, customer lead routing, scheduled broadcasts, and database tracking.",
      image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1200&q=80",
      tags: ["Python", "WhatsApp Automation", "REST APIs", "JSON", "SQL"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false,
      caseStudy: {
        client: "GMS Client Network",
        role: "Automation Developer",
        timeline: "Completed (2024)",
        overview: "Constructed a multi-account WhatsApp automation suite handling high-volume client inquiries with smart auto-responses.",
        architecture: [
          "Headless API orchestration with robust exponential retry backoff",
          "Rate-limited queue manager preventing account flags",
          "SQL database for session logs and lead management"
        ],
        impact: "Handled 15,000+ customer messages with 99.9% uptime."
      }
    },
    {
      id: "minecraft-plugins-mods",
      title: "MINECRAFT PLUGINS, MODS & 3D PACKS",
      subtitle: "Custom Java Plugins, Mods, Datapacks & Blockbench 3D Models",
      category: "gamedev",
      description: "Comprehensive suite of Minecraft server plugins (Java Spigot/Paper), Forge/Fabric mods, custom datapacks, and Blockbench 3D textured resource packs.",
      image: "/muntahi_minecraft.jpg",
      tags: ["Java", "Minecraft Plugins", "Minecraft Mods", "Blockbench", "JSON"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: true,
      caseStudy: {
        client: "Minecraft Multiplayer Communities",
        role: "Game Developer & 3D Modeler",
        timeline: "Active Projects",
        overview: "Developed custom gameplay systems, custom mob boss mechanics, custom weapons, custom 3D Blockbench models, and server performance tools.",
        architecture: [
          "Event-driven Java Spigot API listeners with async SQL storage",
          "Custom Blockbench 3D models textured and exported to JSON resource packs",
          "Server tick optimization maintaining a rock-solid 20 TPS"
        ],
        impact: "Deployed across multiplayer servers serving thousands of active gamers."
      }
    },
    {
      id: "roblox-godot-games",
      title: "ROBLOX & GODOT GAME EXPERIENCES",
      subtitle: "Multiplayer 3D Games & Custom Physics Engines",
      category: "gamedev",
      description: "Interactive 3D games developed in Godot Engine (C++/GDScript) and Roblox Studio (Lua), featuring smooth player movement and multiplayer replication.",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      tags: ["Godot", "Lua", "Roblox Dev", "C++", "3D Graphics"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false,
      caseStudy: {
        client: "GMS Game Studio",
        role: "Lead Game Developer",
        timeline: "Completed Projects",
        overview: "Engineered responsive character mechanics, custom camera scripts, UI audio feedback loops, and server-authoritative multiplayer logic.",
        architecture: [
          "Decoupled Roblox Lua script framework separating client UI and server state",
          "Godot C++ custom nodes for high-FPS particle systems and custom shaders"
        ],
        impact: "Delivered buttery smooth 60 FPS gameplay experiences."
      }
    },
    {
      id: "ecommerce-platforms",
      title: "FLASK & DJANGO E-COMMERCE",
      subtitle: "Scalable Full-Stack E-Commerce Platforms",
      category: "fullstack",
      description: "Full-featured online storefronts featuring product search filters, cart state, secure SQL checkout, user accounts, and responsive glassmorphism UI.",
      image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=1200&q=80",
      tags: ["Flask", "Django", "Python", "SQL", "HTML5", "CSS3", "JavaScript"],
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      featured: false,
      caseStudy: {
        client: "E-Commerce Clients",
        role: "Full-Stack Engineer",
        timeline: "Completed Projects",
        overview: "Built custom Python backends paired with high-contrast UI layouts for seamless mobile shopping experiences.",
        architecture: [
          "Relational SQL schema design with ACID compliance for transactions",
          "RESTful APIs for inventory management and order status webhooks",
          "Optimized front-end asset bundle for fast first-paint times"
        ],
        impact: "Processed online transactions securely with zero downtime."
      }
    }
  ],

  skills: [
    {
      title: "Programming Languages",
      icon: "code",
      skills: [
        { name: "Python", level: 98, tag: "Master" },
        { name: "C & C++", level: 92, tag: "Expert" },
        { name: "Java", level: 94, tag: "Expert" },
        { name: "JavaScript (ES6+) & HTML5/CSS3", level: 96, tag: "Master" },
        { name: "PHP & Lua", level: 90, tag: "Expert" },
        { name: "Batch Scripts", level: 92, tag: "Expert" }
      ]
    },
    {
      title: "Frameworks & Tech",
      icon: "layers",
      skills: [
        { name: "Flask & Django", level: 95, tag: "Master" },
        { name: "REST APIs, JSON & SQL", level: 96, tag: "Master" },
        { name: "WordPress & Elementor", level: 92, tag: "Expert" },
        { name: "Git & GitHub Version Control", level: 98, tag: "Master" }
      ]
    },
    {
      title: "Game Dev & 3D Graphics",
      icon: "gamepad-2",
      skills: [
        { name: "Minecraft Plugin & Mod Dev (Java)", level: 96, tag: "Master" },
        { name: "Minecraft Datapacks & Resource Packs", level: 94, tag: "Expert" },
        { name: "Godot Engine & Roblox Lua Dev", level: 92, tag: "Expert" },
        { name: "Blender & Blockbench 3D Modeling", level: 92, tag: "Expert" }
      ]
    },
    {
      title: "AI, Automation & Design",
      icon: "cpu",
      skills: [
        { name: "Artificial Intelligence & GenAI", level: 96, tag: "Master" },
        { name: "Local AI & Voice Assistants", level: 95, tag: "Master" },
        { name: "WhatsApp & Computer Automation", level: 96, tag: "Master" },
        { name: "UI/UX, Logo & Vector Graphics", level: 94, tag: "Expert" }
      ]
    }
  ],

  experience: [
    {
      period: "2022 — PRESENT",
      role: "Founder & Owner, Chief of Developer",
      company: "GMS (GM's School)",
      location: "Global / Remote",
      description: "Directing tech vision, software architecture, AI development, and technical education. Building full-stack platforms, AI systems, desktop software, and game mechanics.",
      achievements: [
        "Founded two technology initiatives driving open-source software and tech education.",
        "Engineered Deffin AI, Jarvis AI Assistant, and the GMlib Python development framework.",
        "Published Minecraft Java plugins, mods, Roblox experiences, and computer automation suites."
      ],
      tech: ["Python", "Flask", "Django", "C++", "Java", "JavaScript", "Lua", "Godot", "Blockbench"]
    },
    {
      period: "2020 — PRESENT",
      role: "Full-Stack, AI & Game Developer",
      company: "Software Engineering & Advisory",
      location: "Remote",
      description: "Architecting custom web applications, e-commerce stores, WhatsApp automation bots, and 3D game assets for global clients.",
      achievements: [
        "Delivered 100+ software projects with a strict Performance First philosophy.",
        "Created WhatsApp business automation systems and desktop computer management utilities.",
        "Optimized database performance, security, and SEO for client platforms."
      ],
      tech: ["Flask", "Django", "SQL", "WordPress", "WhatsApp API", "Blender", "Blockbench", "Java"]
    }
  ],

  services: [
    {
      id: "srv-1",
      title: "Full-Stack Web & E-Commerce Engineering",
      tagline: "High-performance websites & custom web platforms",
      description: "Custom web applications built with Python (Flask/Django), JavaScript, PHP, and WordPress/Elementor, tailored for fast load times, clean UI/UX, and rock-solid SQL databases.",
      features: ["Custom Flask, Django & WordPress platforms", "RESTful API architecture & SQL databases", "100% responsive dark glassmorphism UI", "SEO & security hardening"],
      icon: "layout"
    },
    {
      id: "srv-2",
      title: "AI Development & Desktop Automation",
      tagline: "Custom Generative AI engines & computer automation",
      description: "Engineering tailored AI systems (Deffin AI), voice assistants (Jarvis AI), computer automation scripts, WhatsApp messaging bots, and custom Python frameworks (GMlib).",
      features: ["Generative & Local AI integration", "Voice assistant & OS computer automation", "WhatsApp messaging bots & queue managers", "Custom Python libraries (GMlib)"],
      icon: "bot"
    },
    {
      id: "srv-3",
      title: "Game Development & 3D Graphics",
      tagline: "Godot, Roblox & Minecraft plugin/mod/3D creation",
      description: "Creating custom Minecraft Java plugins, Forge/Fabric mods, datapacks, Blockbench 3D resource packs, Godot 2D/3D games, and Roblox Lua experiences.",
      features: ["Minecraft Spigot/Paper Java plugins & mods", "Blockbench & Blender 3D modeling & texturing", "Roblox Lua multiplayer game mechanics", "Godot Engine C++/GDScript games"],
      icon: "gamepad-2"
    }
  ],

  testimonials: [
    {
      name: "GMS Advisory Board",
      role: "Technical Partner",
      company: "GMS Network",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      text: "Muntahi's ability to bridge AI engineering, game development, and full-stack web architecture is exceptional. Deffin AI and GMlib have transformed our entire developer ecosystem.",
      stars: 5
    },
    {
      name: "Alex Vance",
      role: "E-Commerce Client",
      company: "Vance Retail",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      text: "Muntahi built our Django e-commerce platform with zero flaws. Blazingly fast, highly secure, beautiful glassmorphism aesthetic, and perfectly automated.",
      stars: 5
    },
    {
      name: "Server Community Lead",
      role: "Minecraft Network Owner",
      company: "Aether Craft",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      text: "The custom Java plugins and Blockbench 3D models Muntahi built for our server increased player retention immensely. True mastery of game development!",
      stars: 5
    }
  ]
};
