
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'button-brown': '#8b5f3a',
                'bg-gray': '#e6e6e6',
            },
        },
    },
    plugins: [],
};