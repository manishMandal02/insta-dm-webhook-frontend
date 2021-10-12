module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainbg: {
          DEFAULT: '#1D1E42',
        },
        secondary: {
          DEFAULT: '#1B1B44',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
