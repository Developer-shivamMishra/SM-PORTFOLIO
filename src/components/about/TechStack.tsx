"use client";

import {
  SiCplusplus,
  SiCss3,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { techStack, type TechStackIcon } from "@/data/data";
import { cn } from "@/lib/utils";

const iconMap: Record<
  TechStackIcon,
  { Icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  javascript: { Icon: SiJavascript, className: "text-[#F7DF1E]" },
  html: { Icon: SiHtml5, className: "text-[#E34F26]" },
  css: { Icon: SiCss3, className: "text-[#1572B6]" },
  cpp: { Icon: SiCplusplus, className: "text-[#00599C]" },
  react: { Icon: SiReact, className: "text-[#61DAFB]" },
  tailwind: { Icon: SiTailwindcss, className: "text-[#38BDF8]" },
  nodejs: { Icon: SiNodedotjs, className: "text-[#339933]" },
  express: { Icon: SiExpress, className: "text-[#888888]" },
  mongodb: { Icon: SiMongodb, className: "text-[#47A248]" },
  git: { Icon: SiGit, className: "text-[#F05032]" },
  github: { Icon: SiGithub, className: "text-foreground" },
  postman: { Icon: SiPostman, className: "text-[#FF6C37]" },
  cicd: { Icon: SiGithubactions, className: "text-[#2088FF]" },
};

function TechPill({ name, icon }: { name: string; icon: TechStackIcon }) {
  const { Icon, className } = iconMap[icon];

  return (
    <span
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-950/50 px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-white/15 sm:text-sm"
    >
      <Icon className={cn("h-4 w-4 shrink-0", className)} aria-hidden />
      {name}
    </span>
  );
}

export default function TechStack() {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Tech Stack
      </h2>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
        {techStack.map((group, index) => (
          <div
            key={group.category}
            className={cn(
              "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-5",
              index < techStack.length - 1 &&
                "border-b border-dotted border-white/10",
            )}
          >
            <p className="shrink-0 text-sm text-muted-foreground sm:w-36 md:w-40">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <TechPill key={item.name} name={item.name} icon={item.icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
