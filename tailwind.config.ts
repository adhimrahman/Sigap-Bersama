import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		// "./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				ijoTua: "var(--ijoTua)",
				ijoMuda: "var(--ijoMuda)"
			},

			boxShadow: {
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
			},

			backgroundImage: {
				'loginForm': "url('../../public/images/bege.png')",
				'wotah': "url('../../public/images/wotah.png')"
			}
		},
	},
	plugins: [],
} satisfies Config;
