import { readFile } from 'fs/promises';
import { glob, Path } from 'glob';
import { join } from 'path';
import fm from 'front-matter';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { z } from 'zod';

const articlesPath = 'articles';

export async function getArticles(): Promise<Path[]> {
  const globPath = join(process.cwd(), articlesPath, '*.mdx');
  const files = await glob(globPath, { stat: true, withFileTypes: true });
  return files;
}

export async function getArticle(slug: string): Promise<ComponentType> {
  const Mdx = dynamic(() => import(`@/articles/${slug}`));
  return Mdx;
}

const metaSchema = z.object({
  authors: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  keywords: z.array(z.string()),
});

type Meta = z.infer<typeof metaSchema>;

export async function getArticleMeta(slug: string): Promise<Meta> {
  const path = join(process.cwd(), articlesPath, slug);

  const content = await readFile(path, {
    encoding: 'utf-8',
  });

  const attributes = fm<Meta>(content).attributes;

  return await metaSchema.parseAsync(attributes);
}