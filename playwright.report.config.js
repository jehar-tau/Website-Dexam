import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/report-preview",
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4177", screenshot: "only-on-failure" },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4177 --strictPort",
    port: 4177,
    reuseExistingServer: false,
  },
});
