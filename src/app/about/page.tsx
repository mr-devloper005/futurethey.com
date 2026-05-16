import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";

const highlights = [
  { label: "Issues shipped (2024–26)", value: "47" },
  { label: "Avg. time on long reads", value: "14m" },
  { label: "Freelancers paid on time", value: "100%" },
];

const values = [
  { title: "Edit hard, publish once", description: "We cut lines that sound smart but cannot be defended in court or in a bar argument." },
  { title: "Readers over algorithms", description: "No infinite scroll of hot takes—one cover, then a stack you can finish." },
  { title: "India-first, not India-only", description: "Our desk is in Mumbai; our contributors file from wherever the story is." },
];

const enabledSiteSections = SITE_CONFIG.tasks.filter((t) => t.enabled);

export default function AboutPage() {
  return (
    <PageShell title={`About ${SITE_CONFIG.name}`} description={SITE_CONFIG.description}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Our Story</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A magazine site that still believes in paragraphs.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} grew out of late-night edits in Bandra and Bangalore—friends sharing drafts before
              anyone had a CMS. Today we run a full stack for long reads, photo essays, PDF companions, and the odd
              studio listing when a story needs a map pin.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-secondary/40 p-4">
                  <div className="text-2xl font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    

      <div className="mt-12 space-y-6">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">What this site is</Badge>
            <h2 className="text-xl font-semibold text-foreground">One desk, several surfaces</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {SITE_CONFIG.name} is built as a small magazine on the web: the homepage and{" "}
              <Link href="/articles" className="font-medium text-foreground underline-offset-2 hover:underline">
                Articles
              </Link>{" "}
              carry long reads first. Around that we host the same tools readers asked for—listings for places we write
              about, classifieds for gigs and housing, images and PDFs as companions to reporting, and profiles for
              staff and partners. Everything shares one search and one sign-in so you are not juggling five products.
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              {SITE_CONFIG.tagline} We are independent (dummy data for now): no corporate owner in the copy you see
              here; when we ship for real, this page will carry masthead names, registered address, and compliance
              contacts.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Sections on this site</Badge>
            <h2 className="text-xl font-semibold text-foreground">Where to click next</h2>
            <p className="text-sm text-muted-foreground">
              Each area below is part of the same publication—use whatever matches what you are trying to do.
            </p>
            <ul className="divide-y divide-border rounded-md border border-border">
              {enabledSiteSections.map((task) => (
                <li key={task.key} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">{task.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{task.description}</p>
                  </div>
                  <Link
                    href={task.route}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[var(--ft-burgundy)] hover:underline"
                  >
                    Open
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              Public site:{" "}
              <Link href="/" className="font-medium text-foreground hover:underline">
                {SITE_CONFIG.domain}
              </Link>
              . For corrections or legal, use{" "}
              <Link href="/contact" className="font-medium text-foreground hover:underline">
                Contact
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Editorial &amp; pitching</Badge>
            <h2 className="text-xl font-semibold text-foreground">How we work (at a glance)</h2>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>We assign edits, fact-check where it matters, and run sensitive copy past legal when needed.</li>
              <li>Pitches: one paragraph on the thesis, two clips, and how you would report it—no mass mail merges.</li>
              <li>We pay freelancers on agreed schedules; rates depend on length, risk, and rights.</li>
              <li>Corrections go at the bottom of the piece with a date stamp—we do not silently rewrite.</li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <Link href="/articles">Read the latest</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Send a pitch or tip</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
