/** @type {import('tailwindcss').Config} */
export default {
    content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
		extend: {
			colors: {
				'header': '#FFFDF0',
				'primary-button': '#2563EB',
				'secondary-button': '#FFF2C2',
				'sidebar': '#D9DFC6',
				'sidebar-hover': '#EFF3EA',
				'background': '#F9FAFB',
				'title': '#4C585B'

			}
		},
    },
    plugins: [],
}