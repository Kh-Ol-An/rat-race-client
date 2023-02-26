const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            MacPawFixelText: [
                'MacPawFixelText',
                ...defaultTheme.fontFamily.sans,
            ],
        },
        screens: {
            '3xl': { max: '1919px' },
            '2xl': { max: '1535px' },
            xl: { max: '1365px' },
            lg: { max: '1023px' },
            md: { max: '767px' },
            sm: { max: '639px' },
        },
        extend: {
            colors: {
                primary: '#528D36',
                primaryLight: '#88C66A',
                secondary: '#296B59',
                secondaryLight: '#61B59E',
                additional: '#859B3B',
                opposite: '#983A4D',
                oppositeLight: '#CC6D80',
            },
            keyframes: {
                flashing: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0)' },
                },
            },
            animation: {
                flashing: 'flashing 1s ease-in-out infinite',
            },
        },
    },
    plugins: [],
    safelist: [
        'bg-primary',
        'bg-secondary',
        'bg-sky-600',
        'bg-red-600',
        'bg-gray-700',
        'bg-orange-600',
        'bg-sky-400',
        'bg-fuchsia-600',
        'bg-yellow-400',
        'bg-gray-600',
        'bg-teal-600',
        'bg-gray-900',
    ],
}
