import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML, JS and CSS to `out/`, served
  // by any static file server. Trailing slashes make each page a
  // directory with an index.html, which needs no server rewrite. Cache
  // components (and partial prefetching, which needs them) cannot be enabled in
  // export mode: "Invariant: PPR cannot be enabled in export mode".
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves a project site under /<repo>/; the Pages workflow sets
  // BASE_PATH. The internal copy serves from the root and leaves it unset.
  basePath: process.env.BASE_PATH || "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
