/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#19078D',
                secondary: '#EFDAFB',
                accent: '#0C5FED'
            }
        },
    },
    plugins: [],
}
