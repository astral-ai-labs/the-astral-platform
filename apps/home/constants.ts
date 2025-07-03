/* ==========================================================================*/
// constants.ts — Application constants for different audiences
/* ==========================================================================*/
// Purpose: Defines constants for builders and enterprise audiences
// Sections: Shared Constants, Hero Constants, Builder Constants, Enterprise Constants, Exports

/* ==========================================================================*/
// Shared Constants
/* ==========================================================================*/

const announcement = {
  text: "🚀 New: Read our vision for the future of AI development",
  button: {
    text: "🚀 New: See Our Vision",
    href: "/resources/future-vision",
    external: true,
  },
};

const footer = {
  copyright: "© 2025 Astral. All rights reserved.",
  contact: "Contact Us",
  linkedin: "LinkedIn",
};



/* ==========================================================================*/
// Enterprise Constants
/* ==========================================================================*/

const enterpriseConstants = {
  navbar: {
    navigation: [
      {
        name: "Vision",
        href: "/company/vision",
        external: false,
      },
      {
        name: "Meet Chris",
        href: "https://cal.com/chris-maresca/15min",
        external: true,
      },
    ],
    announcement: announcement,
    auth: {
      signup: {
        text: "Get Started",
        href: "/enterprise/signup",
        external: false,
      },
      login: {
        text: "Sign In",
        href: "/login",
        external: false,
      },
    },
  },
  cta: {
    titleMobile: "AI-Driven Infrastructure to Create Operational Powerhouses",
    titleDesktop: "AI-Driven Infrastructure to Create Operational Powerhouses",
    subtitle: "Astral is your company's operating system for the AI era.",
    primary: {
      text: "Get Started",
      href: "/enterprise/deploy",
      external: false,
    },
    secondary: {
      text: "Read Our Vision",
      href: "/company/vision",
      external: false,
    },
  },
  providers: {
    label: "Enterprise Integrations",
    title: "Enterprise-Grade AI Infrastructure.",
    subtitle: "Secure, scalable connections to all major AI providers with enterprise SLAs and compliance.",
    cta: {
      text: "See Our Vision",
      href: "/resources/vision",
      external: false,
    },
    list: [
      { name: "OpenAI", logo: "/providers/openai.svg" },
      { name: "Anthropic", logo: "/providers/anthropic.svg" },
      { name: "Gemini", logo: "/providers/gemini.svg" },
      { name: "Azure", logo: "/providers/azure.svg" },
      { name: "Bedrock", logo: "/providers/bedrock.svg" },
      { name: "Google Vertex", logo: "/providers/vertexai.svg" },
      { name: "HuggingFace", logo: "/providers/huggingface.svg" },
      { name: "Ollama", logo: "/providers/ollama.svg" },
      { name: "DeepSeek", logo: "/providers/deepseek.svg" },
    ],
  },
  faq: {
    title: "Enterprise FAQ",
    subtitle: "Answers to common questions about Astral's enterprise AI platform.",
    items: [
      {
        question: "What enterprise features does Astral provide?",
        answer: "Astral Enterprise includes dedicated infrastructure, SSO integration, advanced security controls, custom SLAs, priority support, and comprehensive audit logging for enterprise compliance."
      },
      {
        question: "How does Astral ensure data security and compliance?",
        answer: "We're SOC 2 Type II certified with GDPR compliance. Your data is encrypted in transit and at rest, with no model training on your data. We support private cloud deployments for maximum security."
      },
      {
        question: "Can Astral integrate with our existing systems?",
        answer: "Yes, Astral provides robust APIs and SDKs that integrate seamlessly with your existing infrastructure. We also offer custom integrations and dedicated support for enterprise deployments."
      },
      {
        question: "What kind of SLA do you offer for enterprise customers?",
        answer: "Enterprise customers receive 99.9% uptime SLA with dedicated support channels, priority response times, and custom escalation procedures. We also offer premium SLAs up to 99.99% uptime."
      },
      {
        question: "How does enterprise pricing work?",
        answer: "Enterprise pricing is customized based on your usage volume, required features, and support level. Contact our sales team for a tailored quote that fits your organization's needs."
      },
      {
        question: "Do you offer on-premises or private cloud deployment?",
        answer: "Yes, we offer both private cloud and on-premises deployment options for enterprises with strict data residency or security requirements. This includes full control over your AI infrastructure."
      },
      {
        question: "What support is available for enterprise customers?",
        answer: "Enterprise customers receive dedicated support with priority response times, assigned customer success managers, and access to our solutions architects for implementation guidance."
      }
    ]
  },
};

/* ==========================================================================*/
// Export Constants
/* ==========================================================================*/

export { enterpriseConstants, footer };


