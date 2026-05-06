import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Third Wave Press — Bandra",
    "Studio Calicut — Film scans",
    "Matunga Type Foundry",
    "Indiranagar Running Club",
    "Colaba Maritime Archives",
  ],
  classified: [
    "Sublet: 1BHK near Mahalaxmi",
    "Hiring: investigative researcher",
    "Canon R5 + 24–70 (lightly used)",
    "Weekend Hindi copy editor",
    "Shared desk — Fort co-working",
  ],
  article: [
    "Who still pays for news in 2026?",
    "The night trains of Western Railway",
    "Remote work, Mumbai rents, and guilt",
    "How fan edits rewrite film history",
    "Inside a climate litigation desk",
  ],
  image: [
    "Monsoon over Marine Drive",
    "Old Delhi press lanes",
    "Kerala backwater light study",
    "Chennai autorickshaw typology",
    "Late shift at the copy desk",
  ],
  profile: [
    "Ananya Krishnan — cities desk",
    "Vikram Menon — photo editor",
    "Letters from the readers’ editor",
    "Partner desk: Chiki Sarkar",
    "Intern cohort — Spring 2026",
  ],
  social: [
    "Desk note: filing deadline moved",
    "Call for pitches — labour beat",
    "Correction on yesterday’s chart",
    "Live Q&A with housing reporter",
    "We are hiring a fact-checker",
  ],
  pdf: [
    "Reader survey — raw tables",
    "Style guide (internal draft)",
    "FOI template pack — India",
    "Photo consent checklist",
    "Issue 14 flatplan (PDF)",
  ],
  org: [
    "Indian Writers’ Guild",
    "Press Club Mumbai",
    "DataLEADS — partner wire",
    "The Hoot — media archive",
    "Independent Journalists’ Trust",
  ],
  sbm: [
    "Primary sources — housing bill",
    "Long reads we envied this month",
    "Tools: transcription & OCR",
    "Archives — oral history labs",
    "Podcasts worth the commute",
  ],
  comment: [
    "Re: your piece on gig workers",
    "Thread — defining ‘independent’",
    "Letter — edit was too soft",
    "Response — data methodology",
    "Hot take — paywalls vs ads",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Culture", "Photo", "Design", "Sport", "History"],
  classified: ["Housing", "Jobs", "Gear", "Editorial", "Workspace"],
  article: ["news", "digital", "arts", "education", "blog"],
  image: ["Photo essay", "Reportage", "Portrait", "Street", "Desk"],
  profile: ["Staff", "Contributor", "Desk", "Partner", "Interns"],
  social: ["Newsroom", "Calls", "Corrections", "Events", "Hiring"],
  pdf: ["Internal", "Legal", "Research", "Production", "Planning"],
  org: ["Guild", "Club", "Wire", "Archive", "Trust"],
  sbm: ["Research", "Reading", "Tools", "Archives", "Audio"],
  comment: ["Letters", "Debate", "Method", "Critique", "Opinion"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Desk-verified listing: hours checked, phone answered.",
  classified: "Short classified from a verified Future They account.",
  article: "Essay or reported feature from the editorial desk.",
  image: "Visual story filed with captions and credit lines.",
  profile: "Bio, beats, and how to reach this contributor.",
  social: "Quick newsroom update—treat as ephemeral.",
  pdf: "Companion PDF or internal document (dummy).",
  org: "Partner organisation we cite or work with.",
  sbm: "Bookmarked source or rabbit hole for a future story.",
  comment: "Reader letter or threaded response on a story.",
};

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location: index % 3 === 0 ? "Mumbai" : index % 3 === 1 ? "Delhi" : "Bengaluru",
        description: summaryByTask[task],
        website: "https://futurethey.com",
        phone: "+91-22-4000-1200",
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: "Future They desk",
      publishedAt: new Date().toISOString(),
    };
  });
};
