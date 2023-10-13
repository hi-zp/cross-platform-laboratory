const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const baseConfig = require('../../tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [require('nativewind/tailwind/css')],
}
