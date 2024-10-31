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
    themes: ["light", "dark", "cupcake", {
      mytheme: {
          
        "primary": "#2563eb",
                  
        "primary-content": "#d2e2ff",
                  
        "secondary": "#ffff",
                  
        "secondary-content": "#161616",
                  
        "accent": "#00ffff",
                  
        "accent-content": "#001616",
                  
        "neutral": "#ddd6fe",
                  
        "neutral-content": "#111016",
                  
        "base-100": "#1c1917",
                  
        "base-200": "#171412",
                  
        "base-300": "#12100e",
                  
        "base-content": "#cccbcb",
                  
        "info": "#7dd3fc",
                  
        "info-content": "#051016",
                  
        "success": "#00ff00",
                  
        "success-content": "#001600",
                  
        "warning": "#facc15",
                  
        "warning-content": "#150f00",
                  
        "error": "#ff0000",
                  
        "error-content": "#160000",
        },
    },],
  },
};
export default config;
