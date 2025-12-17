import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@test-utils": resolve(__dirname, "test/utils/index.ts"),
      "@": resolve(__dirname, "src"),
    },
  },
});
