import type { Config } from "tailwindcss";
import daisyui from 'daisyui';
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [daisyui,],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4f46e5",    // Indigo-600 - More vibrant primary
          "secondary": "#1e1b4b",  // Indigo-950 - Darker secondary
          "accent": "#1e1e2a",     // Darker, more sophisticated accent
          "neutral": "#e2e8f0",    // Slate-200 - Lighter, more readable neutral
          "base-100": "#0f172a",   // Slate-900 - Rich dark background
          "info": "#7dd3fc",       // Sky-300 - Brighter info
          "success": "#86efac",    // Green-300 - Kept as is
          "warning": "#fcd34d",    // Amber-300 - Kept as is
          "error": "#ef4444",      // Red-500 - More balanced error color
        },
      },
    ],
  },
};
export default config;
