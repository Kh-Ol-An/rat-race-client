const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            "MacPawFixelText": ["MacPawFixelText", ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                primary: '#528D36',
                secondary: '#296B59',
                additional: '#859B3B',
                opposite: '#983A4D',
            },
        },
    },
    plugins: [],
}
