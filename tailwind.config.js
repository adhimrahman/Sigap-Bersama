/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				'loginForm': "url('./src/assets/bege.png')",
				'wotah': "url('./src/assets/bgWater.png')",
			},
			colors: {
				'ijoTua': "var(--ijoTua)"
			}
		},
	},
	plugins: [],
}