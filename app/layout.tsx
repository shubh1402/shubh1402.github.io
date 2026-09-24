import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shubh1402.github.io"),
  title: "Shubham Gupta — AI / ML Engineer",
  description:
    "AI and machine-learning engineer from network operations. I build automation and ML systems that replace manual work, with code and live demos you can open.",
  openGraph: {
    title: "Shubham Gupta — AI / ML Engineer",
    description:
      "AI and machine-learning engineer from network operations. Automation and ML systems, with code and live demos you can open.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
