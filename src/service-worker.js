/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

workbox.core.setCacheNameDetails({ prefix: 'fastools' });

workbox.skipWaiting();
workbox.clientsClaim();

workbox.routing.registerRoute(
  /^https:\/\/static.fastools.cn\/lib\/.+|^https:\/\/fastools.oss-cn-hangzhou.aliyuncs.com\/lib\/.+/,
  workbox.strategies.cacheOnly(),
);

workbox.routing.registerRoute(/^https:\/\/api.fastools.cn\/v1\/tools\?.+/, workbox.strategies.networkFirst());

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
