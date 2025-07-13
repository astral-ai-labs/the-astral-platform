/* ==========================================================================*/
// tooltip-morphing-popover.tsx — Morphing popover-wrapped button component
/* ==========================================================================*/
// Purpose: Renders a button with morphing popover that appears on click
// Sections: Imports, Props, Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import { ReactNode, useState, useId } from "react";

// Local Modules ---
import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "@/components/motion-primitives/morphing-popover";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface TooltipMorphingPopoverProps {
  content: ReactNode;
  icon: ReactNode;
  text?: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

/**
 * TooltipMorphingPopover
 *
 * Renders a button with morphing popover that appears on click.
 *
 * @param content - Content to display in popover
 * @param icon - Icon element to display in button
 * @param text - Optional text to display next to icon
 * @param onClick - Click handler function
 * @param className - Additional CSS classes for button
 * @param disabled - Whether button is disabled
 */
function TooltipMorphingPopover({ content, icon, text, onClick, className, disabled }: TooltipMorphingPopoverProps) {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MorphingPopover
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.3,
      }}
      open={isOpen}
      className="z-10000 flex flex-row flex-1"
      onOpenChange={setIsOpen}
    >
      <MorphingPopoverTrigger asChild>
        <Button variant="outline" size="sm" onClick={onClick} disabled={disabled} className={cn("h-7 text-xs border-border/70 text-muted-foreground flex items-center justify-center rounded-md flex-1", className)}>
          {icon}
          {text && <span className="text-xs ml-2">{text}</span>}
        </Button>
      </MorphingPopoverTrigger>
      <MorphingPopoverContent className="text-xs bg-accent p-2 rounded-md border border-border/50 text-foreground max-w-xs z-100">{content}</MorphingPopoverContent>
    </MorphingPopover>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { TooltipMorphingPopover };
