import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the lead route can read the program PDF from disk in the serverless bundle.
  outputFileTracingIncludes: {
    "/api/lead": ["./public/growthlab-founding-cohort-program.pdf"],
  },
};

export default nextConfig;
