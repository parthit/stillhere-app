import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media', // Use 'class' for manual control or 'media' for automatic (system preference)
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // You can customize theme colors here if needed
      },
    },
  },
  plugins: [],
};

export default config; 