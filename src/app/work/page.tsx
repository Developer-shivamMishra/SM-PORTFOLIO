"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, profile } from "@/data/data";
import { PillButton } from "@/components/ui/pill-button";
import { FaGithub } from "react-icons/fa";

export default function WorkPage() {
  return (
    <div className="animate-blur-in space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Selected Work
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          A few projects that highlight how I think, build, and ship.
        </p>
      </header>

      <div className="space-y-10">
        {projects.map((project) => (
          <article key={project.name} className="space-y-4">
            <Link
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/40 via-zinc-900 to-zinc-950 p-1 transition-colors hover:border-white/20"
            >
              <div className="flex aspect-[16/10] items-center justify-center rounded-[14px] bg-zinc-950/80">
                <span className="text-lg font-semibold text-white/90 md:text-2xl">
                  {project.name}
                </span>
              </div>
            </Link>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{project.tech}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.desc}
              </p>
              {project.features?.length ? (
                <ul className="space-y-1.5 pt-1 text-sm text-muted-foreground">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2 leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="flex flex-wrap gap-2 pt-1">
                <PillButton href={project.liveLink} external>
                  Visit site
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </PillButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="border-t border-white/10 pt-6">
        <PillButton href={profile.github} external>
          <FaGithub className="h-4 w-4" />
          More projects on GitHub
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
        </PillButton>
      </div>
    </div>
  );
}
