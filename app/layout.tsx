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
    "AI/ML engineer from network operations: automation systems, machine learning and AI tooling, with real code and live demos.",
  metadataBase: new URL("https://shubh1402.github.io"),
  openGraph: {
    title: "Shubham Gupta — AI Engineer",
    description:
      "AI/ML engineer from network operations: automation systems, machine learning and AI tooling.",
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
