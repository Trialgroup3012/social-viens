import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Keep server-only libs unbundled so their __dirname / fs reads resolve
  // to the real node_modules path (required by pdfkit for AFM font metrics).
  // @prisma/client is also kept external so schema updates (db:push) are
  // picked up without requiring a full dev-server restart.
  serverExternalPackages: ["pdfkit", "nodemailer", "@prisma/client", ".prisma/client", "openai", "@google/generative-ai"],
};

export default nextConfig;
