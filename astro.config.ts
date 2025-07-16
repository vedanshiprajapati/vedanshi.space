import vercelAdapter from "@astrojs/vercel";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  prefetch: true,
  compressHTML: true,
  adapter: vercelAdapter({
    webAnalytics: {
      enabled: true,
    },
  }),
});
