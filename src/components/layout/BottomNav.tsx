"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FolderOpen, UserRound, PenLine, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "About", icon: UserRound },
  { href: "/work", label: "Work", icon: FolderOpen },
  { href: "/writing", label: "Writing", icon: PenLine },
];

function DockItem({
  active,
  label,
  compact,
  onClick,
  href,
  ariaLabel,
  children,
}: {
  active?: boolean;
  label: string;
  compact: boolean;
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  const className =
    "group flex flex-col items-center rounded-2xl outline-none transition-all duration-300 ease-out";

  const inner = (
    <>
      <span
        className={cn(
          "flex items-center justify-center rounded-full transition-all duration-300 ease-out",
          compact ? "h-9 w-9" : "h-10 w-10",
          active
            ? "bg-white/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            : "text-zinc-500 group-hover:bg-white/10 group-hover:text-zinc-200 group-active:scale-95",
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "overflow-hidden text-center text-[10px] font-medium tracking-wide transition-all duration-300 ease-out",
          compact
            ? "mt-0 max-h-0 opacity-0"
            : "mt-1 max-h-6 opacity-100",
          active
            ? "text-white"
            : "text-zinc-500 group-hover:text-zinc-300",
        )}
        aria-hidden={compact}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(className, compact ? "min-w-[2.75rem] px-1" : "min-w-[4rem] px-1.5")}
        aria-current={active ? "page" : undefined}
        aria-label={compact ? label : undefined}
        title={label}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(className, compact ? "min-w-[2.75rem] px-1" : "min-w-[4rem] px-1.5")}
      aria-label={ariaLabel ?? label}
      title={label}
    >
      {inner}
    </button>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname === "/about";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div
        className={cn(
          "pointer-events-auto dock-enter flex items-center border border-white/10 bg-zinc-950/90 text-zinc-400 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-2xl ring-1 ring-white/[0.06] transition-all duration-300 ease-out",
          compact
            ? "gap-0.5 rounded-2xl px-2 py-2"
            : "gap-1 rounded-[1.75rem] px-2.5 py-2.5",
        )}
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <DockItem
              key={href}
              href={href}
              label={label}
              active={active}
              compact={compact}
            >
              <Icon
                className="h-[18px] w-[18px] transition-all duration-300"
                strokeWidth={active ? 2.25 : 1.75}
              />
            </DockItem>
          );
        })}

        <div className="mx-0.5 h-8 w-px shrink-0 rounded-full bg-white/10" />

        <DockItem
          label={mounted && theme === "dark" ? "Light" : "Dark"}
          compact={compact}
          ariaLabel={
            mounted && theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
          ) : (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          )}
        </DockItem>
      </div>
    </nav>
  );
}
