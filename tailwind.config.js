/** @type {import('tailwindcss').Config} */
export const content = [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
    extend: {
        colors: {
            // Add your custom colors here if needed
        },
    },
};
export const plugins = [];
export const oxide = process.env.NODE_ENV === "development" ? false : true;
