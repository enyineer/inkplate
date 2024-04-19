import { Metadata, ResolvingMetadata } from 'next';
import { getArticle, getArticleMeta, getArticles } from './helper'
import { inkplateConfig } from '@/inkplate.config.mjs';
import Authors, { getAuthor } from './authors';

type Props = {
  params: { slug: string },
}

export async function generateStaticParams() {
  const articles = await getArticles();

  const generatedParams = articles.map((article) => ({
    slug: article.name,
  }));

  return generatedParams;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const metadata = await getArticleMeta(params.slug);

  const authors = await Promise.all(metadata.authors.map(async (author) => await getAuthor(author)));
 
  return {
    title: `${inkplateConfig.siteName} | ${metadata.title}`,
    description: `InkPlate | ${metadata.description}`,
    authors: authors.map(author => {
      return {
        name: author.displayName,
      }
    }),
    keywords: metadata.keywords.join(', '),
  }
}

export default async function Article({ params }: Props) {
  const Article = await getArticle(params.slug);
  const metadata = await getArticleMeta(params.slug);

  return (
    <>
      <Authors authors={metadata.authors} />
      <Article/>
    </>
  )
}