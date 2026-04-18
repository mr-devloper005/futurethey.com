"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { cn } from "@/lib/utils";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  const gridClass =
    task === "article"
      ? "gap-7 sm:grid-cols-2 lg:grid-cols-3"
      : task === "sbm"
        ? "gap-4 sm:grid-cols-1 lg:grid-cols-2"
        : task === "image"
          ? "gap-5 sm:grid-cols-2 lg:grid-cols-3"
          : task === "listing" || task === "classified"
            ? "gap-5 sm:grid-cols-2 lg:grid-cols-3"
            : task === "profile"
              ? "gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : task === "pdf"
                ? "gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "gap-6 sm:grid-cols-2 lg:grid-cols-4";

  if (!merged.length) {
    return (
      <div className="rounded-sm border border-dashed border-[color-mix(in_srgb,var(--ft-burgundy-deep)_18%,transparent)] bg-[color-mix(in_srgb,var(--ft-cream)_22%,#fff)] p-12 text-center text-muted-foreground">
        <p className="text-sm font-medium text-foreground/80">Nothing published here yet.</p>
        <p className="mt-2 text-sm opacity-80">Check back soon—or open search to explore other formats.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid", gridClass)}>
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
