// import withPWA from "next-pwa"

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   logging: {
//     fetches: {
//       fullUrl: true,
//     },
//   },
// }

// const pwaConfig = {
//   dest: "public",
//   disable: process.env.NODE_ENV === "development",
// }

// const buildConfig = () => {
//   const config = withPWA(pwaConfig)(nextConfig)
//   return config
// }

// export default buildConfig()

import withPWA from "next-pwa";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development",
};

const buildConfig = () => {
  // Apply both plugins in sequence: first PWA, then NextIntl
  const configWithPWA = withPWA(pwaConfig)(nextConfig);
  const finalConfig = withNextIntl(configWithPWA);
  return finalConfig;
};

export default buildConfig();