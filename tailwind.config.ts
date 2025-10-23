import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C9A6D",  // Warm mosgroen - natuurlijk en rustgevend
          700: "#5F7A52",
          50: "#F1F5EE",
        },
        accent: {
          DEFAULT: "#D4A574",  // Warm zandtint - uitnodigend en aards
        },
        neutral: {
          50: "#FAF8F5",  // Warme off-white
          100: "#F5F1EA",  // Beige tint
          200: "#E8DFD1",  // Zandkleur
          600: "#6B5E4F",  // Warm bruin-grijs
          700: "#564B3F",
          900: "#2C2419",  // Donker bruin
        },
        success: "#7C9A6D",
        warning: "#D4A574",
        error: "#C07A5F",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        sans: [
          "Outfit",
          "Nunito",
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        "h1-mobile": ["2.125rem", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        "h2-mobile": ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        "h3-mobile": ["1.375rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        lead: ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      borderRadius: {
        'lg': '1.5rem',    // Extra rond
        'xl': '2rem',      // Zeer rond
        '2xl': '2.5rem',   // Super rond
        'md': '1rem',      // Rond
        'sm': '0.75rem',   // Licht rond
        'full': '9999px',  // Volledig rond
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

