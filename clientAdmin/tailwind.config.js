/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,vue}"],
    theme: {
        extend: {
            colors: {
                mygray: '#313A46',
                myprimary: '#DA8287'
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light"],
    },
}
