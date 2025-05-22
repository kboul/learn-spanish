import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ experimental: {
    reactCompiler: true // use babel-plugin-react-compiler to avoid rerenders
  }, // Disable React strict mode temporarily to avoid double rendering issues
  reactStrictMode: false,
  // Ensure proper hydration
  swcMinify: true
};

export default nextConfig;
