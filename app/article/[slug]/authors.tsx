import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

const authorSchema = z.object({
  displayName: z.string(),
});

export async function getAuthor(author: string) {
  const path = join(process.cwd(), 'authors', `${author}.json`);
  if (!existsSync(path)) {
    throw new Error(`Author data for author ${author} do not exist at ${path}`);
  }
  const file = await readFile(path, {
    encoding: 'utf-8',
  });
  const json = JSON.parse(file);
  const authorData = await authorSchema.parseAsync(json);
  return authorData;
}

interface AuthorsProps {
  authors: string[];
}

export default async function Authors(props: AuthorsProps) {
  const authors = await Promise.all(props.authors.map(async (author) => getAuthor(author)));

  return (
    <div>
      Authors: {authors.map(author => author.displayName).join(', ')}
    </div>
  );
}