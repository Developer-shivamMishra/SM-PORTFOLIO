"use client";

import Link from "next/link";
import { projects, profile, type Project } from "@/data/data";

const mono = "font-[family-name:var(--font-jetbrains-mono)]";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card/50 shadow-sm dark:bg-zinc-900/40">
      <Link
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-b border-border"
      >
        {project.image ? (
          <div className="aspect-[4/3] overflow-hidden bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-950">
            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-500">
              {project.name}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {project.name}
          </h2>
          <p
            className={`mt-1.5 text-[11px] font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400 ${mono}`}
          >
            {project.tech}
          </p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.desc}
        </p>

        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${mono}`}>
          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/80 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
          >
            → live
          </Link>
          {project.sourceLink ? (
            <Link
              href={project.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
            >
              → source
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function WorkPage() {
  return (
    <div className="animate-blur-in space-y-8">
      <header
        className={`flex flex-wrap items-baseline justify-between gap-2 text-sm text-muted-foreground ${mono}`}
      >
        <span className="text-foreground/90">~/projects</span>
        <span>things i built</span>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <footer className={`border-t border-border pt-6 text-sm ${mono}`}>
        <Link
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          → more on github
        </Link>
      </footer>
    </div>
  );
}