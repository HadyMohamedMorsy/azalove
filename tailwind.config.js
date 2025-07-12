/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Responsive typography system
      fontSize: {
        xs: ["0.6rem", { lineHeight: "1rem" }],
        sm: ["0.75rem", { lineHeight: "1.25rem" }],
        base: ["0.875rem", { lineHeight: "1.5rem" }],
        lg: ["1rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],

        // Custom responsive font sizes
        "responsive-xs": ["0.7rem", { lineHeight: "1rem" }],
        "responsive-sm": ["0.8rem", { lineHeight: "1.2rem" }],
        "responsive-base": ["0.9rem", { lineHeight: "1.4rem" }],
        "responsive-lg": ["1rem", { lineHeight: "1.5rem" }],
        "responsive-xl": ["1.1rem", { lineHeight: "1.6rem" }],
        "responsive-2xl": ["1.2rem", { lineHeight: "1.7rem" }],
        "responsive-3xl": ["1.4rem", { lineHeight: "1.8rem" }],
        "responsive-4xl": ["1.6rem", { lineHeight: "1.9rem" }],
        "responsive-5xl": ["2rem", { lineHeight: "1" }],
        "responsive-6xl": ["2.5rem", { lineHeight: "1" }],
        "responsive-7xl": ["3rem", { lineHeight: "1" }],
      },
      boxShadow: {
        "custom-1": "0 0.25rem 0.5625rem -0.0625rem rgba(0, 0, 0, 0.03)",
        "custom-2": "0 0.275rem 1.25rem -0.0625rem rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // New custom color palette based on user's colors
        azalove: {
          50: "#fef9f3",
          100: "#fdf2e3",
          200: "#FFF5E9",
          300: "#f6ca86",
          400: "#f0b054",
          500: "#E6A238", // Main yellow
          600: "#d18a1f",
          700: "#b07118",
          800: "#8f5a16",
          900: "#744914",
        },
        cream: {
          50: "#fffcf8",
          100: "#FFF5E9", // Main white-black
          200: "#fef0db",
          300: "#fde8c4",
          400: "#fbdda8",
          500: "#f9d28c",
          600: "#f5c670",
          700: "#f0b954",
          800: "#e8a737",
          900: "#d9941b",
        },
        royal: {
          50: "#f7f5f8",
          100: "#efeaf1",
          200: "#ddd5e3",
          300: "#c4b5d0",
          400: "#a792b8",
          500: "#8f72a2",
          600: "#7a5b8b",
          700: "#664975",
          800: "#543c61",
          900: "#3D2545", // Main dark-purple
        },
        amaranth: {
          50: "#fef2f4",
          100: "#fce7ea",
          200: "#f9d0d8",
          300: "#f4a8b9",
          400: "#ed7792",
          500: "#e1496e",
          600: "#cd2f54",
          700: "#B22947", // Main amaranth-purple
          800: "#9c253f",
          900: "#872239",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  darkMode: ["class", "class"],
  plugins: [require("tailwindcss-animate")],
};

module.exports = config;
