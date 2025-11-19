import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'autophil-blue': '#007C91',
        'midnight-green': '#004953',
        'cream-white': '#F9F9F6',
        'darker-blue': '#005F73',
      },
    },
  },
  plugins: [],
}
export default config
