import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Add externals configuration for canvas
    config.externals.push({ canvas: 'commonjs canvas' });
    return config;
  },
};

// Sentry configuration
const sentryConfig = {
  silent: true,
  org: "myjobkompass",
  project: "javascript-nextjs",
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const nextConfigWithSentry = withSentryConfig(nextConfig, {}, sentryConfig);

// Babel configuration to disable the throwing of JSX Namespace error
export const babel = {
  plugins: [
    [
      'transform-react-jsx',
      {
        throwIfNamespace: false,
      },
    ],
  ],
};

export default nextConfigWithSentry;

export const reactStrictMode = true;
export const transpilePackages = ['@mui/x-charts'];
