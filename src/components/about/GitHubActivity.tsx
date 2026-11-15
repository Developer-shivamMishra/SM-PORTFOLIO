"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { useTheme } from "next-themes";
import "react-activity-calendar/tooltips.css";
import { profile } from "@/data/data";

const githubThemeDark = {
  dark: ["#e8e8ea", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

const githubThemeCard = {
  dark: ["#1f1f22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const WEEKS_IN_YEAR = 53;
const BLOCK_MARGIN = 2;
const mono = "font-[family-name:var(--font-jetbrains-mono)]";

function useFitCalendarBlocks(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [blockSize, setBlockSize] = useState(8);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      const size = Math.max(
        4,
        Math.min(11, Math.floor(width / WEEKS_IN_YEAR) - BLOCK_MARGIN),
      );
      setBlockSize(size);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return blockSize;
}

type Props = {
  variant?: "card" | "terminal";
};

export default function GitHubActivity({ variant = "card" }: Props) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const blockSize = useFitCalendarBlocks(calendarRef);
  const { resolvedTheme } = useTheme();

  const [data, setData] = useState<Activity[]>([]);
  const [totalThisYear, setTotalThisYear] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then(
        (json: {
          contributions: Activity[];
          totalThisYear: number;
        }) => {
          setData(json.contributions ?? []);
          setTotalThisYear(json.totalThisYear ?? 0);
        },
      )
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const colorScheme =
    variant === "terminal"
      ? resolvedTheme === "light"
        ? "light"
        : "dark"
      : "dark";

  const theme =
    variant === "terminal" ? githubThemeDark : githubThemeCard;

  const graph = (
    <div
      ref={calendarRef}
      className="w-full max-w-full overflow-hidden [&_.react-activity-calendar]:!w-full [&_svg]:max-w-full"
    >
      {error ? (
        <p className="text-sm text-muted-foreground">
          Could not load graph.{" "}
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            GitHub
          </Link>
        </p>
      ) : (
        <ActivityCalendar
          data={data}
          loading={loading}
          colorScheme={colorScheme}
          theme={theme}
          blockSize={blockSize}
          blockMargin={BLOCK_MARGIN}
          blockRadius={2}
          fontSize={blockSize <= 6 ? 8 : 10}
          showWeekdayLabels={false}
          showColorLegend={false}
          showTotalCount={false}
          weekStart={0}
          className="w-full max-w-full"
        />
      )}
    </div>
  );

  if (variant === "terminal") {
    return (
      <section className="space-y-3">
        <div
          className={`flex items-center justify-between gap-2 text-[11px] uppercase tracking-wide text-muted-foreground ${mono}`}
        >
          <span className="text-foreground/80">GitHub</span>
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground/70 hover:text-sky-600 dark:hover:text-sky-400"
          >
            @{profile.githubUsername}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="rounded-sm border border-border bg-background/50 p-3">
          {graph}
        </div>
        <p className={`text-[11px] text-sky-600 dark:text-sky-400 ${mono}`}>
          {loading ? "—" : totalThisYear} contributions this year
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        GitHub Activity
      </h2>
      <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {loading ? "—" : totalThisYear}
            </span>{" "}
            Contributions this year
          </p>
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/50 px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-white/20"
          >
            View profile
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        </div>
        {graph}
      </div>
    </section>
  );
}