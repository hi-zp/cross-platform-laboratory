const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const baseConfig = require('../../tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [require('nativewind/tailwind/css')],
};
