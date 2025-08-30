/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				Jakarta: ["Jakarta", "sans-serif"],
				JakartaBold: ["Jakarta-Bold", "sans-serif"],
				JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
				JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
				JakartaLight: ["Jakarta-Light", "sans-serif"],
				JakartaMedium: ["Jakarta-Medium", "sans-serif"],
				JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
			},
			colors: {
				// Core theme colors - black, grey, white
				black: "#000000",
				white: "#ffffff",
				grey: {
					50: "#fafafa",
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#737373",
					600: "#525252",
					700: "#404040",
					800: "#262626",
					900: "#171717",
					950: "#0a0a0a",
				},
				// Golden accent colors
				gold: {
					50: "#fffbeb",
					100: "#fef3c7",
					200: "#fde68a",
					300: "#fcd34d",
					400: "#fbbf24",
					500: "#f59e0b",
					600: "#d97706",
					700: "#b45309",
					800: "#92400e",
					900: "#78350f",
				},
				// Theme semantic colors
				primary: {
					50: "#fffbeb",
					100: "#fef3c7",
					200: "#fde68a",
					300: "#fcd34d",
					400: "#fbbf24",
					500: "#f59e0b", // Main gold
					600: "#d97706",
					700: "#b45309",
					800: "#92400e",
					900: "#78350f",
				},
				// Surface colors
				surface: {
					primary: "#000000",
					secondary: "#0a0a0a",
					tertiary: "#171717",
					elevated: "#262626",
					overlay: "rgba(255, 255, 255, 0.1)",
				},
				// Text colors
				text: {
					primary: "#ffffff",
					secondary: "#d4d4d4",
					tertiary: "#737373",
					accent: "#fbbf24",
					muted: "#525252",
				},
				// Border colors
				border: {
					primary: "#262626",
					secondary: "#404040",
					accent: "#f59e0b",
				},
				// Legacy color support (keeping for backward compatibility)
				secondary: {
					100: "#f5f5f5",
					200: "#e5e5e5",
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#737373",
					600: "#525252",
					700: "#404040",
					800: "#262626",
					900: "#171717",
				},
				success: {
					100: "#F0FFF4",
					200: "#C6F6D5",
					300: "#9AE6B4",
					400: "#68D391",
					500: "#38A169",
					600: "#2F855A",
					700: "#276749",
					800: "#22543D",
					900: "#1C4532",
				},
				danger: {
					100: "#FFF5F5",
					200: "#FED7D7",
					300: "#FEB2B2",
					400: "#FC8181",
					500: "#F56565",
					600: "#E53E3E",
					700: "#C53030",
					800: "#9B2C2C",
					900: "#742A2A",
				},
				warning: {
					100: "#fffbeb",
					200: "#fef3c7",
					300: "#fde68a",
					400: "#fbbf24",
					500: "#f59e0b",
					600: "#d97706",
					700: "#b45309",
					800: "#92400e",
					900: "#78350f",
				},
			},
			backgroundImage: {
				"gradient-gold": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
				"gradient-gold-secondary":
					"linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
				"gradient-gold-subtle":
					"linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)",
				"gradient-dark": "linear-gradient(135deg, #000000 0%, #171717 100%)",
				"gradient-dark-secondary":
					"linear-gradient(135deg, #171717 0%, #262626 100%)",
				"gradient-dark-elevated":
					"linear-gradient(135deg, #262626 0%, #404040 100%)",
			},
		},
	},
	plugins: [],
};
