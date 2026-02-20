/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    slate: '#0f172a', // Slate 900
                    emerald: '#10b981', // Emerald 500
                }
            }
        },
    },
    plugins: [],
}
