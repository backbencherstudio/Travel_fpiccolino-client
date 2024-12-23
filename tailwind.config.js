import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust based on your project's file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Use the imported `daisyui` plugin
};
