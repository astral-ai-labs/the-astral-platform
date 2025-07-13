import React from "react";

import { SidebarContainer } from "@/components/sidebar/sidebar-container";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";

function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <SidebarContainer />
      <SidebarInset className="overflow-hidden">{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default PlatformLayout;
