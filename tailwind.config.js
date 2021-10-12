module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainbg: {
          DEFAULT: '#222A3F',
        },
        secondary: {
          DEFAULT: '#1F2239',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
