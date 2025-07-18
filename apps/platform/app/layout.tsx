/* ==========================================================================*/
// layout.tsx — Root layout for the home application
/* ==========================================================================*/
// Purpose: Defines the root layout structure with fonts and providers
// Sections: Imports, Fonts, Metadata, Layout Component, Exports

/* ==========================================================================*/
// Imports
/* ==========================================================================*/

// React core
import { Metadata } from "next";

// External Packages ---
import { Geist, Geist_Mono, Manrope, Inter } from "next/font/google";

// Analytics and Speed Insights ---
// import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next"; // TODO: Add Speed Insights

// Local Files ----
import "./styles.css";
import { Providers } from "@/components/providers";

// Local Components ----

// Metadata ---
import { AstralMetadata } from "@workspace/ui/constants/metadata";
/* ==========================================================================*/
// Fonts
/* ==========================================================================*/
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontManrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

/* ==========================================================================*/
// Metadata
/* ==========================================================================*/
export const metadata: Metadata = AstralMetadata;

/* ==========================================================================*/
// Layout Component
/* ==========================================================================*/
/**
 * Root layout component for the application
 *
 * @param children - React children to render within the layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontManrope.variable} ${fontInter.variable} font-inter antialiased w-screen fixed`}>
        <Providers>{children}</Providers>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  );
}
