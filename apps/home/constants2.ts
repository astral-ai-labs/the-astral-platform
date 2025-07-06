/* ==========================================================================*/
// constants.ts — Application constants for different audiences
/* ==========================================================================*/
// Purpose: Defines text constants for all pages and components
// Sections: Home, Careers, Blog, Company, Footer

import { Handshake, Settings, Zap } from "lucide-react";

// ==========================================================================
// Home Constants
// ==========================================================================

const homeConstants = {
  hero: {
    titleMobile: "AI-Driven Infrastructure to Create Operational Powerhouses",
    titleDesktop: "AI-Driven Infrastructure to Create Operational Powerhouses",
    subtitle: "Astral is your company's operating system for the AI era.",
    primary: {
      text: "Get Started",
      href: "/get-started",
      external: false,
    },
    secondary: {
      text: "Read Our Vision",
      href: "/company/vision",
      external: false,
    },
  },
  features: {
    title: "Engineered for industry leaders",
    subtitle: "We deploy AI systems that turn operational complexity into competitive advantages. Built for companies that refuse to accept limitations as permanent.",
    items: [
      {
        icon: Zap,
        text: "Instant Impact",
        description: "We don't optimize existing processes—we make them obsolete. Our AI infrastructure systematically eliminates operational bottlenecks that have held businesses back for decades.",
      },
      {
        icon: Settings,
        text: "Technical Moats",
        description: "We rebuilt the AI development stack from the ground up. Custom datasets spanning thousands of connections enable AI to build other AI systems autonomously within our proprietary infrastructure.",
      },
      {
        icon: Handshake,
        text: "Aligned Outcomes",
        description: "Your success drives our expansion. We embed with teams, own solutions alongside you, and deliver transformational results that compound your competitive advantage.",
      },
    ],
  },
  howItWorks: {
    title: "How does it work?",
    subtitle: "The astral platform lets you describe your biggest operational headaches in plain English. Our AI builds solutions autonomously as you type, then we deploy them into your business.",
    steps: [
      {
        number: "01",
        title: "Identify High-Impact Opportunities",
        morphTitle: "Identify High-Impact Opportunities",
        shortDescription: "Access the astral platform and describe your most critical operational bottlenecks.",
        fullDescription: "Access the astral platform (currently working with select teams in alpha) and describe your highest-impact operational challenges. Which processes consume the most resources? Where are your teams spending time on repetitive work? What operational inefficiencies are costing you the most? No technical requirements, no lengthy vendor evaluations, no implementation roadmaps.",
      },
      {
        number: "02",
        title: "Astral AI Builds Your AI",
        morphTitle: "Astral Agents Build Your Solution",
        shortDescription: "Our AI agents build 75% of your custom solution autonomously as you describe your challenges.",
        fullDescription: "Our proprietary agents build roughly 75% of your custom enterprise solution autonomously as you describe your operational challenges. This is AI building AI, the astral breakthrough that changed everything. Complex business logic and integrations constructed automatically while you define requirements.",
      },
      {
        number: "03",
        title: "Deploy & Scale",
        morphTitle: "Deploy & Scale",
        shortDescription: "Our team finalizes and deploys solutions across your operations. Enterprise transformation in days.",
        fullDescription: "The astral team finalizes your solutions and deploys them across your operations. What traditionally requires months of development, testing, and rollout happens in days. Immediate ROI with systematic competitive advantages that compound across your organization.",
      },
    ],
  },
  faqs: {
    title: "FAQs",
    subtitle: "Common questions about our AI infrastructure and how we transform operational complexity into competitive advantages.",
    items: [
      {
        title: "What makes your AI infrastructure different?",
        value: "ai-infrastructure",
        content: "We don't optimize existing processes—we make them obsolete. Our AI systems are built from the ground up with proprietary infrastructure that enables autonomous development and deployment. Custom datasets spanning thousands of connections allow our AI to build and improve other AI systems without human intervention.",
      },
      {
        title: "How do you ensure aligned outcomes with our business goals?",
        value: "aligned-outcomes",
        content: "Your success drives our expansion. We embed directly with your teams, take ownership of solutions alongside you, and deliver transformational results that compound your competitive advantage. We measure success by your operational improvements, not just deployment metrics.",
      },
      {
        title: "What kind of timeline should we expect for implementation?",
        value: "implementation-timeline",
        content: "We focus on instant impact through our proven three-step methodology: ship early with core functionality, build iteratively with user feedback, and continuously refine toward excellence. Most clients see measurable operational improvements within the first 30 days of deployment.",
      },
      {
        title: "How do you handle data security and compliance?",
        value: "security-compliance",
        content: "Security is built into every layer of our infrastructure. We maintain enterprise-grade security protocols, ensure compliance with industry standards, and provide full transparency into our data handling processes. Your data remains yours—we simply provide the intelligence layer.",
      },
      {
        title: "What level of technical integration is required?",
        value: "technical-integration",
        content: "Our AI systems are designed for seamless integration with existing workflows. We handle the technical complexity so you can focus on results. Our team works directly with your technical staff to ensure smooth deployment and ongoing optimization.",
      },
    ],
  },
  logos: {
    header: "Built By Founders With Experience At The World's Top AI Institutions",
  },
};

// ==========================================================================
// Careers Constants
// ==========================================================================

const careersConstants = {
  page: {
    title: "On a quest for quality",
    subtitle: "Join our team of crafspeople building exceptional software",
  },
  mission: {
    paragraphs: [
      "We believe that there is a lost art of building software. A craftsmanship that yields products of an exceptional, almost magical, quality.",
      "It's difficult to describe this quality with words and impossible to measure it in numbers, but you can feel it when it's there. You know it when you experience it.",
      "To bring back this level of quality, we are building a tool that empowers product teams to do their best work. A tool with unparalleled speed, focus, and design.",
      "Building this tool requires a team of talented individuals who care deeply about the quality of their work, no matter if it's engineering, design, or customer support.",
      "We are looking for people who share our passion for software craftsmanship and getting even the smallest details right.",
      "If that sounds like you, please reach out and join us on our quest.",
    ],
  },
  openRoles: {
    header: "Open roles",
  },
  dummyRoles: [
    {
      id: "senior-frontend-engineer",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "Remote",
      applyLink: "/careers/apply/senior-frontend-engineer",
    },
    {
      id: "product-designer",
      title: "Product Designer",
      department: "Design",
      location: "San Francisco, CA",
      applyLink: "/careers/apply/product-designer",
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      applyLink: "/careers/apply/backend-engineer",
    },
    {
      id: "customer-success-manager",
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "New York, NY",
      applyLink: "/careers/apply/customer-success-manager",
    },
    {
      id: "technical-writer",
      title: "Technical Writer",
      department: "Documentation",
      location: "Remote",
      applyLink: "/careers/apply/technical-writer",
    },
  ],
};

// ==========================================================================
// Blog Constants
// ==========================================================================

const blogConstants = {
  page: {
    title: "What We're Writing",
    subtitle: "We write about the future of work, technology, and the future of our firm.",
  },
};

// ==========================================================================
// Company Constants
// ==========================================================================

const companyConstants = {
  vision: {
    title: "The Future We're Building",
    subtitle: "Astral is your firm's operating system for the age of artificial intelligence.",
  },
};

// ==========================================================================
// Footer Constants
// ==========================================================================

const footerConstants = {
  copyright: "Astral Platform. All rights reserved.",
  infiniteSlider: "Introducing the astral way of working",
};

// ==========================================================================
// Navbar Constants
// ==========================================================================

const navbarConstants = {
  company: {
    trigger: "Company",
    description: "The official operating system for the age of AI.",
    links: [
      {
        label: "Vision",
        href: "/company/vision",
        description: "Our mission to help companies dominate the age of AI.",
        external: false,
      },
      {
        label: "LinkedIn", 
        href: "https://www.linkedin.com/company/buildwithastral",
        description: "Connect with us as we eliminate operational inefficiencies.",
        external: true,
      },
      {
        label: "Careers",
        href: "/company/careers", 
        description: "Build the infrastructure that makes human limitations obsolete.",
        external: false,
      },
    ],
  },
  navigation: [
    {
      label: "Platform",
      href: "https://platform.astral.com",
      external: true,
    },
    {
      label: "Blog",
      href: "/blog",
      external: false,
    },
  ],
  buttons: {
    getStarted: "Get Started",
    getStartedHref: "/get-started",
  },
  mobile: {
    sectionTitle: "Navigation",
    toggleLabel: "Toggle navigation menu",
    themeLabel: "Theme",
    allLinks: [
      {
        label: "Vision",
        href: "/company/vision",
        external: false,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/buildwithastral",
        external: true,
      },
      {
        label: "Careers",
        href: "/company/careers",
        external: false,
      },
      {
        label: "Platform", 
        href: "https://platform.astral.com",
        external: true,
      },
      {
        label: "Blog",
        href: "/blog",
        external: false,
      },
    ],
  },
};

// ==========================================================================
// Exports
// ==========================================================================

export {
  homeConstants,
  careersConstants,
  blogConstants,
  companyConstants,
  footerConstants,
  navbarConstants,
};

// ==========================================================================