import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the lead route can read the PDFs it attaches from disk in the
  // serverless bundle.
  outputFileTracingIncludes: {
    "/api/lead": [
      "./public/growthlab-cohort-program.pdf",
      "./public/growthlab-digital-marketing-guide.pdf",
    ],
  },
};

export default nextConfig;
