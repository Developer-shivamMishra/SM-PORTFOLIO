"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { profile } from "@/data/data";
import { PillButton } from "@/components/ui/pill-button";

const homeSocials = [
  {
    name: "GitHub",
    url: "https://github.com/Developer-shivamMishra",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shivam-mishra-a6302429b/",
    icon: FaLinkedin,
  },
  {
    name: "Twitter",
    url: "https://x.com/cheaf25master",
    icon: FaXTwitter,
  },
];

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="animate-blur-in space-y-8">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {profile.name}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {profile.role}
        </p>
      </header>

      <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground md:text-base">
        {profile.tagline}
      </p>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <span
          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
          aria-hidden
        />
        <p>{profile.availability}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex overflow-hidden rounded-xl border border-border">
          <Link
            href={`mailto:${profile.email}`}
            className="bg-secondary/80 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Get in touch
          </Link>
          <button
            type="button"
            onClick={copyEmail}
            className="border-l border-border bg-secondary/80 px-3 py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Copy email address"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <p className="text-xs text-muted-foreground">Find me on</p>
        <div className="flex flex-wrap gap-2">
          {homeSocials.map(({ name, url, icon: Icon }) => (
            <PillButton key={name} href={url} external>
              <Icon className="h-4 w-4" />
              {name}
            </PillButton>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground/80 pt-8">
        © {profile.name}
      </p>
    </div>
  );
}
