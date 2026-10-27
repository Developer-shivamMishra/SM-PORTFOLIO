import { NextResponse } from "next/server";
import { profile } from "@/data/data";

type ApiContribution = {
  date: string;
  count: number;
  level?: number;
};

export async function GET() {
  const username = profile.githubUsername;

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 60 * 60 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream GitHub API failed" },
        { status: 502 },
      );
    }

    const json = (await res.json()) as {
      contributions?: ApiContribution[];
    };

    const contributions = json.contributions ?? [];
    const year = new Date().getFullYear();

    const totalThisYear = contributions
      .filter((c) => c.date.startsWith(String(year)))
      .reduce((sum, c) => sum + c.count, 0);

    return NextResponse.json({
      contributions: contributions.map((c) => ({
        date: c.date,
        count: c.count,
        level: c.level ?? (c.count === 0 ? 0 : Math.min(4, Math.ceil(c.count / 3))),
      })),
      totalThisYear,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load contributions" },
      { status: 500 },
    );
  }
}
