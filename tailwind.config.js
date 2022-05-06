module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'lime': '#d4e157',
        'jasmine': '#ffe082',
        'rose': '#ef5350',
        'silver': '#cfd8dc',
      },
      fontFamily: {
        jakarta: ['Jakarta Sans'],
      },
      height: {
        fullscreen: 'calc(100vh - 3rem)', // for the left content
        box: 'calc(100vh - 2.75rem)',
        content: 'calc(100vh - 2rem)',
      },
    },
  },
  plugins: [],
}
