"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";

export default function PortfolioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setShowLoading(false);
    }, 1100);

    return () => clearTimeout(loadingTimer);
  }, []);

  const pathname = usePathname();
  const wideLayout =
    pathname === "/" || pathname === "/about" || pathname === "/work";

  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen animate-blur-in bg-background text-foreground">
        <div
          className={cn(
            "mx-auto min-h-screen w-full px-5 pb-32 pt-10 md:px-8 md:pt-14",
            wideLayout ? "max-w-5xl" : "max-w-2xl",
          )}
        >
          {children}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
