/* ==========================================================================*/
// workflow-sidebar.tsx — Secondary sidebar for workflows and tasks
/* ==========================================================================*/
// Purpose: Renders a list of workflows or tasks in the secondary sidebar
// Sections: Imports, Animation Variants, Props, Component, Exports

"use client";

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core ---
import * as React from "react";

// External Packages ---
import { motion, easeInOut } from "motion/react";

// Local Modules ---
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInput } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { WfTaskItem } from "./wf-task-item";

// Types ---
import { WorkflowOrTask, SidebarView } from "@/types";
import { Badge } from "@workspace/ui/components/badge";

/* ==========================================================================*/
// Animation Variants
/* ==========================================================================*/

const TASKS_CONTAINER_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const TASK_ITEM_VARIANTS = {
  hidden: {
    opacity: 0,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.25,
      ease: easeInOut,
    },
  },
};

/* ==========================================================================*/
// Props Interface
/* ==========================================================================*/

interface WorkflowSidebarProps {
  /** Current view mode - workflows or tasks */
  activeView: SidebarView;
  /** Array of workflow or task items to display */
  items: WorkflowOrTask[];
  /** Optional CSS class name */
  className?: string;
  /** Optional callback when an item is selected */
  onItemSelect?: (item: WorkflowOrTask) => void;
}

/* ==========================================================================*/
// Component
/* ==========================================================================*/

function WorkflowSidebar({ activeView, items, className, onItemSelect }: WorkflowSidebarProps) {

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    return items;
  }, [items]);

  const handleItemClick = (item: WorkflowOrTask) => {
    onItemSelect?.(item);
  };

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = React.useState<React.CSSProperties>({});
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [animationKey, setAnimationKey] = React.useState(0);

  React.useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = itemRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight } = hoveredElement;
        console.log('Hover debug:', { hoveredIndex, offsetTop, offsetHeight });
        setHoverStyle({
          top: `${offsetTop}px`,
          height: `${offsetHeight}px`,
        });
      }
    }
  }, [hoveredIndex]);

  // Trigger entrance animation when activeView changes
  React.useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeView]);

  return (
    <Sidebar collapsible="none" className={cn("hidden flex-1 md:flex overflow-x-hidden", className)}>
      {/* Start of Header --- */}
      <SidebarHeader className="gap-3.5 border-b p-4.5">
        <div className="flex w-full items-center justify-between">
          <div className="text-foreground text-base font-medium flex items-center">
            {activeView === "workflows" ? "Workflows" : "Tasks"} <Badge variant="outline" className={cn("text-[11px] !font-mono px-1.5 py-0.5 ml-2", filteredItems.length === 0 ? "text-muted-foreground" : "text-foreground")}>{filteredItems.length}</Badge>
          </div>
        </div>
      </SidebarHeader>
      {/* End of Header ---- */}

      {/* Start of Content --- */}
      <SidebarContent>
        <SidebarGroup className="px-0 pt-0">
          <SidebarGroupContent>
            {filteredItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No {activeView} available
              </div>
            ) : (
              <div className="overflow-y-auto overflow-x-hidden w-full">
                {/* Items Container with Relative Positioning and Animation */}
                <motion.div 
                  key={animationKey}
                  className="relative"
                  initial="hidden"
                  animate="visible"
                  variants={TASKS_CONTAINER_VARIANTS}
                >
                  {/* Hover Highlight Background */}
                  <div
                    className="absolute left-0 right-0 transition-all duration-300 ease-out bg-muted/30 dark:bg-muted/20"
                    style={{
                      ...hoverStyle,
                      opacity: hoveredIndex !== null ? 1 : 0,
                    }}
                  />
                  
                  {/* Items */}
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={TASK_ITEM_VARIANTS}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      ref={(el) => { itemRefs.current[index] = el; }}
                    >
                      <WfTaskItem
                        item={item}
                        isHovered={hoveredIndex === index}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* End of Content ---- */}
    </Sidebar>
  );
}

/* ==========================================================================*/
// Public Component Exports
/* ==========================================================================*/

export { WorkflowSidebar };
export type { WorkflowSidebarProps };