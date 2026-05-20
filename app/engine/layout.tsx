import type { Metadata } from "next";
import "./engine.css";

export const metadata: Metadata = {
  title: "Naïve · Growth Intelligence Engine",
  description: "Query discovery, content gap analysis, and GEO brief generation for Naïve.",
};

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return <div className="engine-shell">{children}</div>;
}
