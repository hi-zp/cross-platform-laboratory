//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withTM = require('next-transpile-modules')(['nativewind']);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "react-native",
    "react-native-svg",
    "react-native-web",
    "react-native-safe-area-context",
  ],
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack(config) {
    // Mix in aliases
    if (!config.resolve) {
      config.resolve = {};
    }

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Alias direct react-native imports to react-native-web
      'react-native$': 'react-native-web',
      // Alias internal react-native modules to react-native-web
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',

      // You need to add this line for react-native-web to work.
      // 'react': path.resolve(__dirname, '../../node_modules/react'),
    };

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve?.extensions ?? []),
    ];

    if (!config.plugins) {
      config.plugins = [];
    }

    return config;
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
  withTM,
];

module.exports = composePlugins(...plugins)(nextConfig);
