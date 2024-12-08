/** @type {import('tailwindcss').Config} */
import textShadowPlugin from "@designbycode/tailwindcss-text-shadow";

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
			},
			textShadow: {
				sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
				DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)',
				lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
				custom: '2px 4px 8px rgba(255, 0, 0, 0.75)',
			},
			height: {
				'100': "26rem",
				'105': "30rem",
			}
		},
	},
	plugins: [
		textShadowPlugin,
	],
}