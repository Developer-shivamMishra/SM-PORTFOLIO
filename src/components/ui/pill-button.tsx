import Link from "next/link";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function PillButton({
  href,
  onClick,
  children,
  className,
  external,
}: PillButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/80 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}
