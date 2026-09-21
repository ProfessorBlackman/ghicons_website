import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static — no route handlers, middleware, server actions or
  // image optimisation — so it exports to plain files and can be hosted
  // anywhere. Deployed to GitHub Pages from .github/workflows/deploy.yml.
  output: "export",

  // Produces icons/index.html rather than icons.html, so a bare static host
  // resolves /icons without needing extensionless-URL rewriting.
  trailingSlash: true,

  // next/image needs a server to optimise; the site does not use it, and this
  // keeps the export from failing if someone adds an <Image> later.
  images: { unoptimized: true },
};

export default nextConfig;
