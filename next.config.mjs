import NextMDX from "@next/mdx";
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

const withMDX = NextMDX({
  // Optionally provide remark and rehype plugins
  options: {
    // remarkFrontmatter is actually just used to hide Frontmatter Content from Markdown - we use 'front-matter' package for parsing the data
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  // Always export as static pages
  output: "export",
};

export default withMDX(nextConfig);
