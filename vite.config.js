import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        consultation: resolve(__dirname, "consultation.html"),
        team: resolve(__dirname, "team.html")
      }
    }
  }
});
