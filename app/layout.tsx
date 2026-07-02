import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { CommandPalette } from "@/components/command-palette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shubham Gupta — AI Engineer",
  description:
    "AI Automation Engineer building production ML pipelines, automation systems, and AI-native tooling. From network operations to autonomous systems.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Shubham Gupta — AI Engineer",
    description:
      "AI Automation Engineer building production ML pipelines, automation systems, and AI-native tooling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <CommandPalette />
        <main>{children}</main>
      </body>
    </html>
  );
}
