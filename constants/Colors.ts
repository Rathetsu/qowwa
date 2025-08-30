/**
 * Stunning black, grey, white, and gold color theme for the fitness app
 */

const tintColorLight = "#f59e0b"; // Gold
const tintColorDark = "#fbbf24"; // Bright gold

export const Colors = {
	light: {
		text: "#171717",
		background: "#ffffff",
		tint: tintColorLight,
		icon: "#525252",
		tabIconDefault: "#737373",
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: "#ffffff",
		background: "#000000",
		tint: tintColorDark,
		icon: "#d4d4d4",
		tabIconDefault: "#737373",
		tabIconSelected: tintColorDark,
	},
	// Core theme colors
	theme: {
		// Primary colors - gold accents
		primary: "#f59e0b", // Main gold
		primaryLight: "#fbbf24", // Light gold
		primaryDark: "#d97706", // Dark gold

		// Surface colors - blacks and greys
		surfacePrimary: "#000000", // Pure black
		surfaceSecondary: "#0a0a0a", // Deep black
		surfaceTertiary: "#171717", // Dark grey
		surfaceElevated: "#262626", // Elevated grey
		surfaceOverlay: "rgba(255, 255, 255, 0.1)", // White overlay

		// Text colors
		textPrimary: "#ffffff", // White text
		textSecondary: "#d4d4d4", // Light grey text
		textTertiary: "#737373", // Medium grey text
		textAccent: "#fbbf24", // Gold accent text
		textMuted: "#525252", // Muted grey text

		// Border colors
		borderPrimary: "#262626", // Dark border
		borderSecondary: "#404040", // Medium border
		borderAccent: "#f59e0b", // Gold border

		// Status colors
		success: "#22c55e", // Green
		warning: "#f59e0b", // Gold (matches theme)
		error: "#ef4444", // Red
		info: "#3b82f6", // Blue

		// Background gradients (for LinearGradient components)
		gradientGoldPrimary: ["#f59e0b", "#d97706"], // Main gold gradient
		gradientGoldSecondary: ["#fbbf24", "#f59e0b", "#d97706"], // Multi-stop gold
		gradientGoldSubtle: ["rgba(251, 191, 36, 0.2)", "rgba(217, 119, 6, 0.2)"], // Subtle gold
		gradientDarkPrimary: ["#000000", "#171717"], // Main dark gradient
		gradientDarkSecondary: ["#171717", "#262626"], // Secondary dark
		gradientDarkElevated: ["#262626", "#404040"], // Elevated dark

		// Enhanced overlay effects
		overlayLight: "rgba(255, 255, 255, 0.1)",
		overlayMedium: "rgba(255, 255, 255, 0.2)",
		overlayDark: "rgba(0, 0, 0, 0.5)",
		overlayGold: "rgba(245, 158, 11, 0.2)",

		// Special effects
		glowGold: "rgba(245, 158, 11, 0.4)",
		shadowDark: "rgba(0, 0, 0, 0.8)",
		shadowGold: "rgba(245, 158, 11, 0.3)",
	},
	// Legacy support (keeping for backward compatibility)
	fitness: {
		primary: "#f59e0b", // Changed to gold
		primaryDark: "#d97706", // Dark gold
		secondary: "#262626", // Dark grey
		accent: "#fbbf24", // Light gold
		success: "#22c55e", // Green
		warning: "#f59e0b", // Gold
		error: "#ef4444", // Red

		// Background gradients (legacy)
		gradientStart: "#000000", // Black
		gradientMid: "#171717", // Dark grey
		gradientEnd: "#262626", // Medium grey

		// Text colors (legacy)
		textPrimary: "#ffffff",
		textSecondary: "#d4d4d4",
		textMuted: "#737373",
		textDisabled: "#525252",

		// Surface colors (legacy)
		surfacePrimary: "rgba(255, 255, 255, 0.1)",
		surfaceSecondary: "rgba(255, 255, 255, 0.05)",
		surfaceBorder: "rgba(255, 255, 255, 0.1)",
		surfaceBorderActive: "rgba(245, 158, 11, 0.5)", // Gold border
	},
};
