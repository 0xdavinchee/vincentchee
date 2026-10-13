import { defineConfig } from "@playwright/test";

// Network-dependent external link check; kept out of `npm run check` so flaky third parties don't block builds.
export default defineConfig({
  testDir: "tests/links",
  testMatch: "*.spec.ts",
  workers: 6,
  reporter: [["list"]],
});
