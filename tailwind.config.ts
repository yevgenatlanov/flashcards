import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "rgb(21 21 21/var(--tw-bg-opacity,1))",
        dusk: "rgb(32 32 34/var(--tw-bg-opacity,1))",
        dawn: "rgb(148 148 149/var(--tw-bg-opacity,1))",
        sunrise: "rgb(245 245 250/var(--tw-bg-opacity,1))",
        zenith: "rgb(255 255 255/var(--tw-bg-opacity,1))",
      },
      spacing: {
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "40": "40px",
        "48": "48px",
        "64": "64px",
        "72": "72px",
        "80": "80px",
        "88": "88px",
        "96": "96px",
        "104": "104px",
        "120": "120px",
        "160": "160px",
        "240": "240px",
        "320": "320px",
        "496": "496px",
        "536": "536px",
        "736": "736px",
        "1440": "1440px",
      },
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        lg: "24px",
        xl: "36px",
        "2xl": "48px",
        "4xl": "64px",
      },
      letterSpacing: {
        wider: "2px",
        widest: "3px",
      },
      maxWidth: {
        "496": "496px",
        "536": "536px",
        "736": "736px",
        "1440": "1440px",
      },
      height: {
        "120": "120px",
      },
      width: {
        "120": "120px",
        "240": "240px",
        "320": "320px",
      },
      minHeight: {
        "240": "240px",
        "320": "320px",
      },
    },
  },
  plugins: [],
};

export default config;
