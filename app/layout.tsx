import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naïve Growth Engineer Application",
  description:
    "48-hour sprint: a query discovery engine, a platform bug report, and three growth-ready blog posts for Naïve.",
  openGraph: {
    title: "Naïve Growth Engineer Application",
    description: "48-hour sprint — engine built, bug found, 3 pages shipped.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
