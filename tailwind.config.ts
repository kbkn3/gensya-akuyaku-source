import daisyui from 'daisyui'
// import themes from 'daisyui/src/theming/themes'
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), daisyui],
  daisyui: {
    themes: [
      {
        wikipediaTheme: {
          primary: '#3366cc', // Wikipedia's blue links
          secondary: '#a2a9b1', // Light gray for secondary elements
          accent: '#eaecf0', // Very light gray for accents
          neutral: '#202122', // Almost black for text
          'base-100': '#ffffff', // White background
          info: '#eaf3ff', // Light blue for info boxes
          success: '#00af89', // Green for success messages
          warning: '#fc3', // Yellow for warnings
          error: '#d33', // Red for errors

          // Custom CSS
          '--rounded-box': '0.25rem', // Slightly rounded corners
          '--rounded-btn': '0.25rem',

          // Font settings
          'font-family':
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Lato', 'Helvetica', 'Arial', sans-serif",
        },
      },
    ],
  },
} satisfies Config as Config;
