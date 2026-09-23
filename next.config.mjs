/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the site can be hosted free on GitHub Pages (shubh1402.github.io)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
