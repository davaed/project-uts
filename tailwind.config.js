module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'box-lime': '#d4e157',
        'box-jasmine': '#ffe082',
        'box-rose': '#ef5350',
        'box-silver': '#cfd8dc',
      },
      fontFamily: {
        jakarta: ['Jakarta Sans'],
        satoshi: ['Satoshi']
      },
      height: {
        fullscreen: 'calc(100vh - 3rem)', // for the left content

        'hidden-menu': 'calc(100vh - 1.25rem)',
        'section-left': 'calc(100vh - 4rem)',
      },
      screens: {
        phone: '480px',
      },
    },
  },
  plugins: [],
}
