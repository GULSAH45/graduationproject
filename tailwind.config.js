/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        BasketBorderColor: "rgb(221,221,221)",
        InputBackground: "rgb(247,247,247)", 
        MainBackgroundColor: "rgb(255,255,255)",
        TextLoginButtonColor: "#2126AB",
        TextInputBorderColor: "rgb(229,229,229)",
        SearchBarPlaceholderColor: '#333333',
        MenuBorderColor: 'rgb(229,229,229)',
        AccountEmailInput: ' rgba(136, 136, 136, 1)'
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        xxs: ['11px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
         md: ['16px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2xl': ['24px', { lineHeight: '36px' }],
      },
    },
  },
  plugins: [],
}