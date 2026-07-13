import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  /* Type errors must fail a production build. */
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: false,
  // Keep server-only libs unbundled so their __dirname / fs reads resolve
  // to the real node_modules path (required by pdfkit for AFM font metrics).
  // @prisma/client is also kept external so schema updates (db:push) are
  // picked up without requiring a full dev-server restart.
  serverExternalPackages: ["pdfkit", "nodemailer", "@prisma/client", ".prisma/client", "openai", "@google/generative-ai"],
};

export default nextConfig;
