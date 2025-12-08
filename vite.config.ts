import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [".csb.app", ".codesandbox.io"], // ✅ Cho phép host CodeSandbox
    port: 5173,
  },
});
