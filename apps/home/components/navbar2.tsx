/* ==========================================================================*/
// navbar2.tsx — Main navigation component with animated menu items
/* ==========================================================================*/
// Purpose: Primary navigation with logo, menu items, and mobile responsive design
// Sections: Imports, Animation Variants, Components, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import type React from "react";
import { useState, useEffect, useRef } from "react";

// External Packages ---
import { motion, useReducedMotion, easeInOut } from "motion/react";
import { Menu, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

// Local Components ---
import { AstralFull } from "./astral-logos/astral-full";
import { ModeToggle } from "./ui/theme-toggle";
import { Button } from "@workspace/ui/components/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@workspace/ui/components/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetHeader } from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { Separator } from "@workspace/ui/components/separator";

// Local Constants ---
import { navbarConstants } from "@/constants";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const ENTRY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: -2,
    filter: "blur(1px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const HOVER_ANIMATION_PROPS = {
  whileHover: { scale: 1.035 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1, ease: easeInOut },
};

const LOGO_HOVER_ANIMATION_PROPS = {
  whileHover: { scale: 1.035 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1, delay: 0, ease: easeInOut },
};

const ANIMATION_TRANSITIONS = {
  navbar: {
    duration: 0.4,
    delay: 0.1,
    ease: easeInOut,
  },
  navItems: {
    duration: 0.4,
    delay: 0.2,
    ease: easeInOut,
  },
};

/* ==========================================================================*/
// Components
/* ==========================================================================*/

/**
 * ListItem
 *
 * Navigation menu item with inline arrow that appears on hover.
 */
function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  const shouldReduceMotion = useReducedMotion();
  const isExternal = href.startsWith("http");

  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-muted/10 rounded-md px-3">
        <Link href={href} className="group block" target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
          <div className="flex items-center gap-3 text-sm leading-none font-medium group-hover:scale-[1.01] transition-transform duration-100 ease-in-out origin-left">
            {title}
            {!shouldReduceMotion && (
              <div className="origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-100 ease-in-out">
                <ArrowRight className="size-3 text-foreground" />
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-xs group-hover:text-foreground line-clamp-2 leading-snug transition-colors duration-100 ease-in-out">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

/**
 * Navbar
 *
 * Main navigation component with logo, navigation menu, and mobile responsive design.
 * Features animated menu items and smooth transitions.
 */
export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Ensure component is mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update hover style when hoveredIndex changes
  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = itemRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight } = hoveredElement;
        setHoverStyle({
          top: `${offsetTop}px`,
          height: `${offsetHeight}px`,
        });
      }
    }
  }, [hoveredIndex]);

  // Animation props - conditionally applied based on reduced motion preference
  const hoverAnimationProps = shouldReduceMotion ? {} : HOVER_ANIMATION_PROPS;
  const hoverOnlyAnimationProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.035 },
        transition: { duration: 0.1, ease: easeInOut },
      };
  const logoHoverAnimationProps = shouldReduceMotion ? {} : LOGO_HOVER_ANIMATION_PROPS;

  // Animation variants - only animate after mounting to prevent hydration mismatch
  const entryVariants = mounted ? ENTRY_VARIANTS : { hidden: {}, visible: {} };
  const animationTransitions = mounted ? ANIMATION_TRANSITIONS : { navbar: {}, navItems: {} };

  return (
    <header className="sticky top-0 z-50 px-4 pb-4">
      <div className="fade-bottom absolute left-0 h-16 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60"></div>
      <div className="relative mx-auto max-w-5xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left side */}
          <motion.div variants={entryVariants} initial="hidden" animate="visible" transition={animationTransitions.navbar} style={!mounted ? { opacity: 1 } : undefined}>
            <motion.div {...logoHoverAnimationProps}>
              <Link href="/" className="flex items-center space-x-2">
                {/* Always show full logo */}
                <AstralFull className="h-[16px] xl:h-[17px] w-auto" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Navigation group - Right side */}
          <motion.div className="hidden md:flex items-center space-x-6" variants={entryVariants} initial="hidden" animate="visible" transition={animationTransitions.navItems} style={!mounted ? { opacity: 1 } : undefined}>
            {/* Navigation Menu */}
            <NavigationMenu delayDuration={100}>
              <NavigationMenuList>
                {/* Company Dropdown */}
                <NavigationMenuItem>
                  <motion.div {...hoverOnlyAnimationProps}>
                    <NavigationMenuTrigger className={cn("bg-transparent !hover:bg-background")}>{navbarConstants.company.trigger}</NavigationMenuTrigger>
                  </motion.div>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 w-[500px] grid-cols-[1fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild className="hover:bg-muted/10 rounded-md">
                          <Link className="group flex h-full w-full select-none flex-col justify-center items-start p-4 rounded-md" href="/">
                            <AstralFull className="size-19 text-foreground transition-all duration-200 ease-in-out group-hover:scale-[1.02]" />
                            <div className="flex items-center gap-1 mt-[-10px]">
                              <p className="text-xs leading-tight text-muted-foreground group-hover:text-foreground transition-colors duration-100 ease-in-out text-left w-4/5">{navbarConstants.company.description}</p>
                              {!shouldReduceMotion && <ArrowRight className="size-3 text-foreground origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-100 ease-in-out w-1/5" />}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {navbarConstants.company.links.map((link) => (
                        <ListItem key={link.href} href={link.href} title={link.label}>
                          {link.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Navigation Links */}
                {navbarConstants.navigation.map((navItem) => (
                  <NavigationMenuItem key={navItem.href}>
                    <motion.div {...hoverAnimationProps}>
                      <Link href={navItem.href} legacyBehavior passHref>
                        <NavigationMenuLink 
                          className={cn(navigationMenuTriggerStyle(), "bg-transparent !hover:bg-background")} 
                          target={navItem.external ? "_blank" : undefined} 
                          rel={navItem.external ? "noopener noreferrer" : undefined}
                        >
                          {navItem.label}
                        </NavigationMenuLink>
                      </Link>
                    </motion.div>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <motion.div {...hoverAnimationProps}>
              <Button asChild className={cn("hidden md:flex", "shrink-0 py-0 h-8 px-3")}>
                <Link href={navbarConstants.buttons.getStartedHref}>{navbarConstants.buttons.getStarted}</Link>
              </Button>
            </motion.div>

            <Separator orientation="vertical" className="hidden md:block h-5 w-px bg-muted" />

            {/* Mode Toggle */}
            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </motion.div>

          {/* Mobile Menu - Right side */}
          <motion.div className="md:hidden" variants={entryVariants} initial="hidden" animate="visible" transition={animationTransitions.navItems} style={!mounted ? { opacity: 1 } : undefined}>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button 
                  {...(mounted ? hoverAnimationProps : {})}
                  className={cn(
                    "inline-flex items-center justify-center cursor-pointer",
                    "h-10 w-10 rounded-md",
                    "bg-transparent hover:bg-transparent focus-visible:bg-transparent",
                    "text-foreground",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] flex flex-col bg-background">
                <SheetHeader className="pb-4">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>

                <div className="flex-1 flex flex-col justify-between py-6 px-2">
                  {/* Navigation Links */}
                  <nav className="space-y-1">
                    <div className="mb-4">
                      <div className="space-y-1 relative">
                        {/* Hover Highlight Background */}
                        <div
                          className="absolute left-0 right-0 transition-all duration-300 ease-out bg-muted/30 dark:bg-muted/20 rounded-lg"
                          style={{
                            ...hoverStyle,
                            opacity: hoveredIndex !== null ? 1 : 0,
                          }}
                        />
                        
                        {/* Navigation Items */}
                        <div className="relative">
                          {navbarConstants.mobile.allLinks.map((link, index) => (
                            <div 
                              key={link.href}
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              ref={(el) => { itemRefs.current[index] = el; }}
                              className="py-3 px-3 rounded-lg cursor-pointer relative z-10 transition-all duration-200"
                            >
                              <Link 
                                href={link.href} 
                                target={link.external ? "_blank" : undefined} 
                                rel={link.external ? "noopener noreferrer" : undefined} 
                                onClick={() => setMobileMenuOpen(false)} 
                                className="flex items-center justify-between group w-full text-base font-medium text-foreground"
                              >
                                <span>{link.label}</span>
                                {link.external && (
                                  <ExternalLink className="size-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                )}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </nav>

                  {/* Bottom Section */}
                  <div className="space-y-4">
                    <Separator />
                    
                    {/* CTA Button and Theme Toggle */}
                    <div className="flex items-center justify-between px-3">
                      <ModeToggle />
                      <Button asChild size="sm">
                        <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================*/
// Exports
/* ==========================================================================*/
