import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

self.__WB_MANIFEST;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
