/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        InputBackground: "#F7F7F7", 
        MainBackgroundColor: "#F3F3F3",
        TextLoginButtonColor: "#2126AB",
  
      },
    
    },
  },
  plugins: [],
}