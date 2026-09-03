import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the lead route can read the guide PDF it attaches from disk in the
  // serverless bundle.
  outputFileTracingIncludes: {
    "/api/lead": ["./public/growthlab-digital-marketing-guide.pdf"],
  },
};

export default nextConfig;
