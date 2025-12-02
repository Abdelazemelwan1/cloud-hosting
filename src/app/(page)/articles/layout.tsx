import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles Page",
  description: "Articles about programming",
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}