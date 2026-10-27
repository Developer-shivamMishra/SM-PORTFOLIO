"use client";

import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import Loading from "@/components/Loading";

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

  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen animate-blur-in bg-background text-foreground">
        <div className="mx-auto min-h-screen w-full max-w-2xl px-5 pb-32 pt-10 md:px-8 md:pt-14">
          {children}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
