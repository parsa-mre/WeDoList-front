/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#072ac8",
                    200: "#4440cf",
                    300: "#6356d6",
                    400: "#7d6cdc",
                    500: "#9583e3",
                    600: "#ab9be9",
                },
                surface: {
                    100: "#121212",
                    200: "#282828",
                    300: "#3f3f3f",
                    400: "#575757",
                    500: "#717171",
                    600: "#8b8b8b",
                },
                "surface-mixed": {
                    100: "#181522",
                    200: "#2d2a37",
                    300: "#44414d",
                    400: "#5c5964",
                    500: "#75727c",
                    600: "#8f8d94",
                },
                "surface-mixed-2": {
                    100: "#0D0714",
                    200: "#2D2A37",
                },
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
