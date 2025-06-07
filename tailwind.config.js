/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        InputBackground: "rgb(247,247,247)", 
        MainBackgroundColor: "rgb(255,255,255)",
        TextLoginButtonColor: "#2126AB",
        TextInputBorderColor: "rgb(229,229,229)",
    SearchBarPlaceholderColor: '#333333',
  },

},
  },
  plugins: [],
}