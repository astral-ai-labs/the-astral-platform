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
    subtitle: "We deploy intelligent systems that transform operational complexity into insurmountable competitive advantages. Designed for companies that want to dominate their industries.",
    items: [
      {
        icon: Zap,
        text: "Instant Impact",
        description: "Our infrastructure deploys artificial intelligence that eliminates operational limitations within hours to days, building advantages that compound beyond your competitors' reach.",
      },
      {
        icon: Settings,
        text: "Proprietary Intelligence",
        description: "We control the entire AI development stack. Our infrastructure and datasets enable our agents to build other AI systems autonomously, creating insurmountable technical moats.",
      },
      {
        icon: Handshake,
        text: "Performance Partnership",
        description: "We embed with your teams and own the solution alongside you. Our success scales with your competitive advantage. When your intelligence compounds, our partnership deepens.",
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
        title: "What makes astral different?",
        value: "ai-infrastructure",
        content: [
          "Most AI companies fall into two buckets: consultancies and vertical SaaS AI offerings. Both approaches fundamentally miss the mark.",
          "AI consultancies offer high customization tailored to your workflows, but you become dependent on them for ongoing maintenance. Implementation takes months because they lack proper development infrastructure.",
          "Vertical SaaS worked when companies were just organizing information. But now that intelligent systems do actual work for your business, standardized solutions fail. Your competitive advantages can't come from the same tools your competitors use. It's like having one employee work for all of your biggest competitors.",
          "astral controls the entire AI development stack. We deploy proprietary intelligent systems custom-built for your organization that operate autonomously without consultant dependency. You get consultancy-level customization with software scalability, plus technical moats competitors cannot replicate.",
        ],
      },
      {
        title: "How quickly can we see results?",
        value: "implementation-timeline",
        content: [
          "We want to be honest. Most likely, you'll see results within days to a couple of weeks. As you progress with astral, it'll start looking like hours to days.",
          "This is something we're working on vigorously with our early partners. Our intelligent systems eliminate traditional implementation timelines because our AI builds and deploys other AI systems autonomously. The more our infrastructure learns your operations, the faster subsequent deployments become.",
          "Unlike traditional software that requires lengthy configuration, our proprietary stack adapts and optimizes itself to your specific workflows. Early partners are seeing operational improvements within their first week, but true results will compound as the intelligence scales across their organization.",
        ],
      },
      {
        title: "What does a partnership with astral look like?",
        value: "security-compliance",
        content: [
          "At the root of business is only one thing: service. We believe the age of artificial intelligence opens up an entirely new customer experience. Scalability no longer needs to mean losing the human touch and overall experience of using a platform.",
          "Our pricing favors both sides. The more transformational results we deliver, the more you'll want to expand astral across your organization. This creates a virtuous cycle where exceptional performance drives deeper partnership. We succeed when your competitive advantages compound, which means our incentives are perfectly aligned with your growth.",
          "Rather than traditional software licensing, we operate as true partners. Your success determines our expansion within your organization, creating sustainable value for both parties.",
        ],
      },
      {
        title: "How do you handle data security and compliance?",
        value: "technical-integration",
        content: [
          "We're building our security infrastructure alongside our early partners. Currently, we implement industry-standard encryption and secure data handling practices, with plans to achieve formal compliance certifications as we scale.",
          "We work directly with your team to understand your specific security requirements and implement appropriate safeguards for your data. Our approach is transparent about what protections are currently in place and what we're building toward.",
          "As an early-stage company, we're committed to building security into our foundation rather than bolting it on later. We'll grow our compliance capabilities alongside your needs and industry requirements.",
        ],
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
    title: "Build with us",
    subtitle: "Join the team making operational excellence systematic and scalable",
  },
  mission: {
    paragraphs: [
      "We're building the future where artificial intelligence eliminates operational friction and unleashes human potential. At astral, we believe work should focus on what humans do best: creativity, judgment, and meaningful problem-solving.",
      "This transformation requires rebuilding how operations function from the ground up. We're not building another vertical AI agent or simply a low code automation platform. We're eliminating the manual limitations that prevent teams from accomplishing their most important work.",
      "Our mission is to make operational inefficiency obsolete. Instead of humans spending time on repetitive tasks and workflow management, intelligent systems handle operational complexity automatically while teams focus on strategy, relationships, and creative solutions.",
      "We approach partnerships differently because we believe that at the root of business is service. The age of artificial intelligence opens up entirely new possibilities for customer relationships. We refuse to hide behind a platform and believe we can scale genuine, personalized service without sacrificing human connection.",
      "Our success depends entirely on delivering transformational results for our customers. The better we perform, the more our partnership grows, creating aligned incentives where exceptional service drives mutual success and deeper collaboration.",
      "Joining astral means joining a world class organization where the standard is extraordinarily high. We're looking for people who are relentless about building something exceptional, who thrive on autonomy, and who care deeply about improving the human experience. If you're driven by the opportunity to eliminate operational limitations through intelligence, we want to work with you.",
    ],
  },
  openRoles: {
    header: "Open roles",
  },
  dummyRoles: [
    {
      id: "founding-engineer",
      title: "Founding Engineer",
      department: "Founding",
      location: "Remote",
      applyLink: "https://root-sedum-108.notion.site/Founding-Engineer-2290798f38db80deb8e5dd5b71ec0fa2",
    },
    {
      id: "founding-design-engineer",
      title: "Founding Design Engineer",
      department: "Founding",
      location: "Remote",
      applyLink: "https://root-sedum-108.notion.site/Founding-Design-Engineer-2290798f38db80fd98f6cac995626cd2",
    },
    {
      id: "founding-generalist",
      title: "Founding Generalist",
      department: "Founding",
      location: "Remote",
      applyLink: "https://root-sedum-108.notion.site/Founding-Generalist-2290798f38db8085b847df2549d84294",
    },
  ],
};

// ==========================================================================
// Blog Constants
// ==========================================================================

const blogConstants = {
  page: {
    title: "What We're Writing",
    subtitle: "We write about the future of work, artificial intelligence, and operational excellence.",
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

export { homeConstants, careersConstants, blogConstants, companyConstants, footerConstants, navbarConstants };

// ==========================================================================
