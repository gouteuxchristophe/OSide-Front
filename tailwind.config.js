//  @type {import('tailwindcss').Config}

module.exports = {
  purge: [
    './src/*.{js,ts,jsx,tsx,mdx,vue}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx,vue}',
  ],
  theme: {
    colors: {
      primary0: '#0BAD92', // Main Primary color */
      primary1: '#2BEACA',
      primary2: '#19CFB0',
      primary3: '#0C826E',
      primary4: '#0C574B',
      secondary10: '#0CBD5E', // Main Secondary ) */
      secondary11: '#2BEE86',
      secondary12: '#1AD972',
      secondary13: '#0D914A',
      secondary14: '#0D6134',
      secondary20: '#127EAC', // Main Secondary ) */
      secondary21: '#33B3EA',
      secondary22: '#219ACF',
      secondary23: '#115F81',
      secondary24: '#0F4157',
    },
    extend: {
    },
  },
  plugins: [],
};
