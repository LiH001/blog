import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function postToSlug(post: BlogPost) {
  return post.id.replace(/\.(md|mdx)$/, '');
}

export function tagToSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

export function getAllTags(posts: BlogPost[]) {
  const tagMap = new Map<string, { name: string; count: number; slug: string }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagToSlug(tag);
      const current = tagMap.get(slug);
      tagMap.set(slug, {
        name: current?.name ?? tag,
        count: (current?.count ?? 0) + 1,
        slug
      });
    }
  }

  return [...tagMap.values()].sort((a, b) => a.name.localeCompare(b.name));
}
