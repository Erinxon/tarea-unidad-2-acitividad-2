// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    css: true,
    include: ["src/**/*.{test,spec}.ts?(x)"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "tests/**",
        "playwright.config.ts",
        "src/main.tsx",
        "src/**/__mocks__/**"
      ]
    }
  }
});
