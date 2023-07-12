/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true
    },
    colors: {
      blue: '#0d6efd',
      indigo: '#6610f2',
      purple: '#6f42c1',
      pink: '#d63384',
      red: '#dc3545',
      orange: '#fd7e14',
      yellow: '#ffc107',
      green: 'green',
      teal: '#20c997',
      cyan: '#0dcaf0',
      primary: '#0d6efd',
      secondary: '#6c757d',
      success: 'teal',
      info: '#0dcaf0',
      warning: '#ffc107',
      danger: '#dc3545',
      light: '#f8f9fa',
      dark: '#212529',
    }
  },
  plugins: [],
}
