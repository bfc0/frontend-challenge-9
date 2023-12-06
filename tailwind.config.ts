import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      moderateblue: 'hsl(238, 40%, 52%)',
      softred: 'hsl(358, 79%, 66%)',
      lightgrayishblue: 'hsl(239, 57%, 85%)',
      palered: 'hsl(357, 100%, 86%)',
      darkblue: 'hsl(212, 24%, 26%)',
      grayishblue: 'hsl(211, 10%, 45%)',
      lightgray: 'hsl(223, 19%, 93%)',
      verylightgray: 'hsl(228, 33%, 97%)',
      white: 'hsl(0, 0%, 100%)',

    }
  },
  plugins: [],
}
export default config
