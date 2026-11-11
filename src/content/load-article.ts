import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type ArticleBody = {
  /** Lines before the first numbered section (letterhead, contacts). */
  header: string[];
  sections: { title: string; paragraphs: string[] }[];
};

/** Reads src/content/articles/<slug>.md. Server-only (build time). */
export function loadArticleBody(slug: string): ArticleBody {
  const raw = readFileSync(join(process.cwd(), 'src', 'content', 'articles', `${slug}.md`), 'utf8').replace(/\r\n/g, '\n');
  const [head, ...rest] = raw.split(/^## /m);
  return {
    header: head.split('\n').map((l) => l.trim()).filter(Boolean),
    sections: rest.map((block) => {
      const [title, ...body] = block.split('\n');
      return {
        title: title.trim(),
        paragraphs: body
          .join('\n')
          .split(/\n\s*\n/)
          .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
          .filter(Boolean),
      };
    }),
  };
}
