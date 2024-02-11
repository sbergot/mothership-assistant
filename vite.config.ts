/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "debug-loadouts.html",
        "debug-armors.html",
        "debug-equipment.html",
        "debug-weapons.html",
        "debug-icons.html",
      ],
    },
  },
});
