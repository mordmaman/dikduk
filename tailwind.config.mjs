/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: {
          DEFAULT: '#f5f5f0',
          dark: '#121212',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e1e1e',
        },
        primary: {
          DEFAULT: '#1e40af',
          light: '#60a5fa',
        },
        secondary: {
          DEFAULT: '#d4a84b',
        },
        hebrew: {
          DEFAULT: '#1e40af',
          dark: '#d4a84b',
        },
        text: {
          DEFAULT: '#1a1a1a',
          dark: '#e0e0e0',
        },
        muted: {
          DEFAULT: '#6b7280',
          dark: '#9ca3af',
        },
        success: {
          DEFAULT: '#16a34a',
          dark: '#22c55e',
        },
        error: {
          DEFAULT: '#dc2626',
          dark: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        hebrew: ['Frank Ruhl Libre', 'SBL Hebrew', 'Ezra SIL', 'Noto Serif Hebrew', 'serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      maxWidth: {
        lesson: '768px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '768px',
            color: theme('colors.text.DEFAULT'),
            h1: {
              color: theme('colors.text.DEFAULT'),
            },
            h2: {
              color: theme('colors.text.DEFAULT'),
            },
            h3: {
              color: theme('colors.text.DEFAULT'),
            },
            strong: {
              color: theme('colors.text.DEFAULT'),
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.light'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.text.dark'),
            h1: {
              color: theme('colors.text.dark'),
            },
            h2: {
              color: theme('colors.text.dark'),
            },
            h3: {
              color: theme('colors.text.dark'),
            },
            strong: {
              color: theme('colors.text.dark'),
            },
            a: {
              color: theme('colors.primary.light'),
              '&:hover': {
                color: theme('colors.primary.DEFAULT'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
