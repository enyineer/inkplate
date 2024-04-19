# 🖋️ InkPlate

> InkPlate is a static site Generator for Blogs and stuff using GitHub for integrating features such as building, hosting and comments. No Server or hosting needed!

InkPlate uses Next.js, MDX, GitHub Actions, GitHub Pages and GitHub Discussions.

## Building

InkPlate uses GitHub Actions to build the site if you add articles or if comments have been added to articles (via Discussions).

## Hosting

InkPlate uses GitHub Pages to host the site.

# Adding Articles

Adding articles is as simple as creating a new Markdown File inside `app/article/`! The GitHub Build Action will discover the new Article, create a GitHub Discussion for comments and link to it inside the Article.

If Users start commenting the Discussion, the Page will be rebuilt every time so that it reflects the new Comments in the Discussion for the Article.

# Develop

Want to contribute to InkPlate? Just clone the repository, install [bun](https://bun.sh/) and start developing with `bun install && bun --bun run dev`.

Make sure to use Pull-Requests to integrate your changes.