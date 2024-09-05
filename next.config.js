/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    REACT_APP_IPFS_GATEWAY: process.env.REACT_APP_IPFS_GATEWAY,
    DEPLOYED_APP: process.env.DEPLOYED_APP,
  },
  images: {
    //formats: ['image/webp'], // Check this out for avoiding showing jpeg's as avif
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.REACT_APP_IPFS_GATEWAY,
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
