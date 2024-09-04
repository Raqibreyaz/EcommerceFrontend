import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true, // Enable PWA plugin in development mode
        type: "module", // Ensure PWA plugin works well with module support in development
      },

      strategies: "injectManifest", // Uses your custom service worker file
      srcDir: "src", // Directory where your service worker source file is located
      filename:"sw.js",
      registerType: "autoUpdate", // Automatically updates the service worker
      injectManifest:{
        swSrc:"src/sw.js",
        swDest:"dist/sw.js"
      },
      manifest: {
        name: "Banaras Mart",
        short_name: "B-Mart",
        id:"/",
        description:"Women's Online Cloth Store",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#fff",
        background_color: "#fff",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
      },
    }),
  ],
});
