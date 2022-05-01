module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        'fullscreen': 'calc(100vh - 3rem)', // for the left content
        'box': 'calc(100vh - 2.75rem)',
        'content': 'calc(100vh - 2rem)'
      }
    },
  },
  plugins: [],
}
