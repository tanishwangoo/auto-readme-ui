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
          
        "primary": "#0a21c0",
                  
        "secondary": "#050a44",
                  
        "accent": "#2c2e3a",
                  
        "neutral": "#b3b4bd",
                  
        "base-100": "#141619",
                  
        "info": "#a5f3fc",
                  
        "success": "#86efac",
                  
        "warning": "#fcd34d",
                  
        "error": "#ff0000",
          }
      },
    ],
  },
};
export default config;
