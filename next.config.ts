import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Fixes npm packages that depend on `fs` module
      config.externals.push(
        "fs",
        "path",
        "stream",
        "crypto",
        "http",
        "https",
        "url",
        "net",
        "tls",
        "zlib"
      );
    }

    // Handle TypeORM decorators
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
