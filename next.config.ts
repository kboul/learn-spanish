import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ experimental: {
    reactCompiler: true // use babel-plugin-react-compiler to avoid rerenders
  }
};

export default nextConfig;
