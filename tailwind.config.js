/** @type {import('tailwindcss').Config} */
export default {
    content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
		extend: {
			colors: {
				'header': '#0C0A09',
				'primary-button': '#FF6500',
				'secondary-button': '#EDE8DC',
				'sidebar': '#171411',
				'sidebar-hover': '#A8998A',
				'select-button': '#FFE7D6',
				'modal': '#231F1A',
				'title': '#FFFFFF'
			}
		},
    },
    plugins: [],
}