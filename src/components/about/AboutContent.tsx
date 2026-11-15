"use client";

import Link from "next/link";
import { profile } from "@/data/data";
import TechStack from "@/components/about/TechStack";
import GitHubActivity from "@/components/about/GitHubActivity";

const mono = "font-[family-name:var(--font-jetbrains-mono)]";

const pageLinks = [
  { href: "/work", path: "/work", label: "selected projects" },
  { href: "/writing", path: "/writing", label: "articles and notes" },
];

const sidebarSocials = [
  {
    key: "github",
    label: "github",
    href: "https://github.com/Developer-shivamMishra",
    suffix: "/Developer-shivamMishra",
  },
  {
    key: "x",
    label: "x",
    href: "https://x.com/cheaf25master",
    suffix: "/cheaf25master",
  },
  {
    key: "linkedin",
    label: "linkedin",
    href: "https://www.linkedin.com/in/shivam-mishra-a6302429b/",
    suffix: "/in/shivam-mishra-a6302429b",
  },
  {
    key: "email",
    label: "email",
    href: `mailto:${profile.email}`,
    suffix: profile.email,
  },
];

function SidebarSection({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="space-y-3">
      <h2
        className={`text-[11px] uppercase tracking-wide text-muted-foreground ${mono}`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AboutContent() {
  return (
    <div className="animate-blur-in space-y-10">
      <header
        className={`flex items-center justify-between gap-4 border-b border-border pb-4 text-sm ${mono}`}
      >
        <span className="text-foreground">~/about</span>
        <a
          href="#status"
          className="text-muted-foreground transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          TL;DR
        </a>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-0 lg:divide-x lg:divide-border">
        <main className="lg:pr-8">
          <div className="space-y-5 text-[15px] leading-[1.75] text-foreground/90">
            <p>
              I&apos;m{" "}
              <strong className="font-semibold text-foreground">
                {profile.name}
              </strong>
              , a {profile.role.toLowerCase()} who enjoys building full-stack
              products, shipping real projects, and learning in public. I care
              about clean architecture, dependable backends, and interfaces
              that stay out of the way.
            </p>
            <p>
              Lately I&apos;m going deeper on{" "}
              <strong className="font-semibold">AI</strong> —{" "}
              <strong className="font-semibold">LLMs</strong>,{" "}
              <strong className="font-semibold">RAG</strong>, and{" "}
              <strong className="font-semibold">AI agents</strong> — while
              keeping my{" "}
              <strong className="font-semibold">DSA</strong> sharp. I built{" "}
              <Link
                href="https://interviewpack.site"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-border underline-offset-4 hover:decoration-sky-500"
              >
                InterviewPack
              </Link>{" "}
              to help people prep for roles with resume intelligence and tailored
              interview practice.
            </p>
            <p>
              I&apos;m{" "}
              <strong className="font-semibold">{profile.availability}</strong>{" "}
              — reach me at{" "}
              <Link
                href={`mailto:${profile.email}`}
                className="font-medium underline decoration-border underline-offset-4 hover:decoration-sky-500"
              >
                {profile.email}
              </Link>
              .
            </p>
          </div>

          <div className="group relative mt-8 overflow-hidden rounded-sm border border-border bg-black">
            <div className="relative aspect-square w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.aboutImage}
                alt="Spiral galaxy of stars — curiosity and exploration"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </div>
        </main>

        <aside className="space-y-8 lg:pl-8">
          <GitHubActivity variant="terminal" />

          <SidebarSection title="Current status" id="status">
            <ul className={`space-y-2 text-sm text-muted-foreground ${mono}`}>
              <li>
                <span className="text-sky-600 dark:text-sky-400">*</span>{" "}
                {profile.availability}
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-400">*</span>{" "}
                learning LLMs, RAG, and AI agents in production
              </li>
              <li>
                <span className="text-sky-600 dark:text-sky-400">*</span>{" "}
                open to freelance, internships, and collaboration
              </li>
            </ul>
          </SidebarSection>

          <SidebarSection title="Links">
            <ul className={`space-y-2 text-sm ${mono}`}>
              {sidebarSocials.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    target={item.key === "email" ? undefined : "_blank"}
                    rel={
                      item.key === "email" ? undefined : "noopener noreferrer"
                    }
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <span className="underline underline-offset-2">
                      {item.label}
                    </span>{" "}
                    <span className="text-muted-foreground/80">·</span>{" "}
                    <span>{item.suffix}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Pages">
            <ul className={`space-y-2 text-sm ${mono}`}>
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <span className="underline underline-offset-2">
                      {item.path}
                    </span>{" "}
                    <span className="text-muted-foreground/80">·</span>{" "}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarSection>
        </aside>
      </div>

      <div className="border-t border-border pt-10">
        <TechStack />
      </div>
    </div>
  );
}